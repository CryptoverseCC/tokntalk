import qs from 'qs';
import escape from 'escape-html';
import QRious from 'qrious';
import IpfsAdd from 'ipfs-api/src/add';
import html2canvas from 'html2canvas';

import { colors } from '../entityApi';

const isDev = process.env.NODE_ENV === 'development';
const ipfsAdd = IpfsAdd({ host: 'ipfs.infura.io', port: '5001', protocol: 'https', 'api-path': '/api/v0/' });
const isSvg = /.svg$/;

const { token_id, content, etherscan_url, link } = qs.parse(window.location.search.replace('?', ''));

const $container = document.querySelector('.main');
const $catAvatarImg = document.querySelector('.kitten_img .img');
const $catId = document.querySelector('.kitty-name');
const $message = document.querySelector('.text p');
const $qr = document.querySelector('.qr canvas');
const $footer = document.querySelector('.link');

fetch(`https://api.cryptokitties.co/kitties/${token_id}`)
  .then((res) => res.json())
  .then((catInfo) => {
    if (catInfo.name) {
      $catId.innerHTML += catInfo.name;
    } else {
      $catId.innerHTML += `#${token_id}`;
    }

    $catAvatarImg.style.background = colors[catInfo.color];

    return drawImageOnCanvas(catInfo.image_url_cdn, $catAvatarImg);
  })
  .then(() => {
    if (isInIframe()) {
      shoot($container)
        .then((blob) => uploadToIpfs(blob))
        .then((ipfsHash) => {
          window.parent.postMessage({ type: 'ipfsHash', ipfsHash }, '*');
        });
    }
  });

$message.innerHTML = escape(content);

new QRious({
  element: $qr,
  value: etherscan_url,
});

$footer.innerHTML = link;

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
  return fetch(`https://cors-anywhere.herokuapp.com/${imageUrl}`)
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
