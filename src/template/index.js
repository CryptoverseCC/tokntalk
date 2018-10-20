import qs from 'qs';
import escape from 'escape-html';
import QRious from 'qrious';
import IpfsAdd from 'ipfs-api/src/add';
import html2canvas from 'html2canvas';
import jazzicon from 'jazzicon';
import logo from '../img/logo_text.svg';

// ToDo remove - use opensea
const colors = {
  babypuke: '#eff1e0',
  bubblegum: '#fadff4',
  chestnut: '#efe1da',
  coralsunrise: '#fde9e4',
  cyan: '#c5eefa',
  doridnudibranch: '#faeefa',
  eclipse: '#e5e7ef',
  forgetmenot: '#dcebfc',
  gold: '#faf4cf',
  limegreen: '#d9f5cb',
  mintgreen: '#cdf5d4',
  parakeet: '#e5f3e2',
  pumpkin: '#fae1ca',
  sapphire: '#d3e8ff',
  sizzurp: '#dfdffa',
  strawberry: '#ffe0e5',
  thundergrey: '#eee9e8',
  topaz: '#d1eeeb',
  twilightsparkle: '#ede2f5',
};

const isDev = process.env.NODE_ENV === 'development';
const ipfsAdd = IpfsAdd({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', 'api-path': '/api/v0/' });
const isSvg = /.svg$/;

const { entity, content, etherscan_url, link } = qs.parse(window.location.search.replace('?', ''));
const contract = entity.split(':')[1];
const token_id = entity.split(':')[2];

const $container = document.querySelector('.main');
const $logo = document.querySelector('.logo');
const $catAvatarImg = document.querySelector('.kitten_img .img');
const $catId = document.querySelector('.kitty-name');
const $message = document.querySelector('.text p');
const $qrLink = document.querySelector('.qr-link');
const $qrTransaction = document.querySelector('.qr-transaction');

$logo.src = logo;

function generateIconForAddress(address) {
  const icon = jazzicon(100, parseInt(address.slice(2, 10), 16)).firstChild;
  const serializer = new XMLSerializer();
  const blob = new Blob([serializer.serializeToString(icon)], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
}

const entityInfo = new Promise((resolve, reject) => {
  if (entity.split(':').length > 1) {
    fetch(`https://api.userfeeds.io/api/decorate-with-opensea`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        flow: [
          {
            algorithm: 'experimental_owner_of_erc721',
            params: {
              context: entity,
            },
          },
        ],
      }),
    }).then((res) => resolve(res.json()));
  } else {
    resolve({
      items: [
        {
          context_info: {
            name: entity,
            image_preview_url: generateIconForAddress(entity),
            size: {
              width: '120px',
              height: '120px',
              left: '0',
              top: '0',
            },
          },
          color: '#FFF',
        },
      ],
    });
  }
})
  .then((data) => {
    const entityInfo = data.items[0];
    if (entityInfo.context_info.name) {
      $catId.innerHTML += entityInfo.context_info.name;
    } else {
      $catId.innerHTML += `#${token_id}`;
    }

    $catAvatarImg.style.background = colors[entityInfo.color];

    if (entityInfo.context_info.size) {
      $catAvatarImg.style.width = entityInfo.context_info.size.width;
      $catAvatarImg.style.height = entityInfo.context_info.size.height;
      $catAvatarImg.style.top = entityInfo.context_info.size.top;
      $catAvatarImg.style.left = entityInfo.context_info.size.left;
    }

    return drawImageOnCanvas(entityInfo.context_info.image_preview_url, $catAvatarImg);
  })
  .then(() => {
    if (isInIframe()) {
      shoot($container)
        .then((blob) => {
          window.parent.postMessage({ type: 'update', state: 'upload' }, '*');
          return blob;
        })
        .then((blob) => uploadToIpfs(blob))
        .then((ipfsHash) => {
          window.parent.postMessage({ type: 'ipfsHash', ipfsHash }, '*');
        });
    }
  });

$message.innerHTML = escape(content);

if (etherscan_url !== 'undefined') {
  new QRious({
    element: $qrTransaction.querySelector('canvas'),
    value: etherscan_url,
  });
  $qrTransaction.style.display = 'flex';
}

new QRious({
  element: $qrLink.querySelector('canvas'),
  value: link,
});

const MIN_FONT_SIZE = 0.8;
const adjustFontSize = ($element, fontSize) => {
  if (fontSize < MIN_FONT_SIZE) {
    return;
  }
  $element.style.fontSize = `${fontSize}em`;
  if ($element.offsetHeight > $element.parentElement.offsetHeight) {
    adjustFontSize($element, fontSize * 0.9);
  }
};
adjustFontSize($message, 6);

function drawImageOnCanvas(imageUrl, $canvas) {
  return fetch(imageUrl)
    .then((res) => {
      if (!isSvg.test(imageUrl)) {
        return res.blob();
      }

      return res.text().then((svg) => {
        const svgElement = new DOMParser().parseFromString(svg, 'image/svg+xml').firstChild;
        const width = svgElement.getAttribute('width');
        const height = svgElement.getAttribute('height');
        if (!width && !height) {
          svgElement.setAttribute('width', 300);
          svgElement.setAttribute('height', 300);
        }

        return new Blob([svgElement.outerHTML], { type: 'image/svg+xml' });
      });
    })
    .then((blob) => URL.createObjectURL(blob))
    .then(
      (imgURL) =>
        new Promise((resolve) => {
          const img = document.createElement('img');
          img.onload = () => {
            URL.revokeObjectURL(imgURL);
            resolve(img);
          };
          img.src = imgURL;
        }),
    )
    .then((img) => {
      const context = $canvas.getContext('2d');
      context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, $canvas.width, $canvas.height);
    });
}

function shoot($element) {
  return html2canvas($element, {
    logging: isDev,
    scale: 1,
  }).then(
    (canvas) =>
      new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob));
      }),
  );
}

function uploadToIpfs(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener('loadend', () => {
      const arrayBuffer = reader.result;
      ipfsAdd(Buffer.from(arrayBuffer)).then(([{ hash }]) => resolve(hash));
    });
    reader.readAsArrayBuffer(blob);
  });
}

function isInIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
