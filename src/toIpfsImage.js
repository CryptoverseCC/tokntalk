const DEFAULT_TIMEOUT = 45 * 1000;
const { REACT_APP_BASENAME: BASENAME } = process.env;
const templateUrl = `${window.location.origin}${BASENAME ? `/${BASENAME}` : ''}/template.html`;

export default function(content, link, etherscanUrl, tokenId, onProgress) {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe');

    const timeoutID = setTimeout(() => {
      reject(Error('TIMEOUT'));
      clean();
    }, DEFAULT_TIMEOUT);

    const onMessage = (event) => {
      if (event.source === iframe.contentWindow) {
        switch (event.data.type) {
          case 'ipfsHash':
            resolve(`https://ipfs.io/ipfs/${event.data.ipfsHash}`);
            clean();
            break;
          case 'update':
            onProgress && onProgress(event.data.state);
            break;
          default:
            reject(event.data);
            clean();
        }
      }
    };

    const clean = () => {
      clearTimeout(timeoutID);
      window.removeEventListener('message', onMessage);
      iframe.remove();
    };

    window.addEventListener('message', onMessage);

    const iframeUrl = `${templateUrl}?token_id=${tokenId}&etherscan_url=${encodeURIComponent(
      etherscanUrl,
    )}&link=${encodeURIComponent(link)}&content=${encodeURIComponent(content)}`;
    iframe.src = iframeUrl;
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);
  });
}
