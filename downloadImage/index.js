/**
 * @description <a>的download属性仅支持同源url，因此对不同源的图片和txt文件需要为的处理才能点击直接下载
 */



/**
 * 综合方法，支持任意格式，支持跨越下载重命名，缺点是同源的文件也需要多一些操作
 */
function downloadFile(url, fileName) {
  download(url, fileName);

  function getBlob(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
        };

        xhr.send();
    });
  }
  function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        const body = document.querySelector('body');

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        link.style.display = 'none';
        body.appendChild(link);
        
        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href);
    }
  }
  function download(url, filename) {
    getBlob(url).then(blob => {
        saveAs(blob, filename);
    });
  }
}

// 以下方法存在缺点，弃用

// 方法一
function downloadImageByCreateIframe(url) {
  if (!document.querySelector('#IframeReportImg')) {
    const iframe = createDOM('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" width="0" height="0" src="about:blank"></iframe>');
    document.body.appendChild(iframe[0]);
  }

  const Iframe = document.querySelector('#IframeReportImg');
  if (Iframe.getAttribute('src') !== url) {
    Iframe.setAttribute('src', url);
  } else {
    if (Iframe.getAttribute('src') != 'about:blank') {
      window.frames['IframeReportImg'].document.execCommand('SaveAs');
    }
  }
}

function createDOM(html) {
  if ( html.indexOf('<') === -1 && html.indexOf('>') === -1 ) {
    return;
  }

  let toCreate = 'div';
  if ( html.indexOf('<li') === 0 ) toCreate = 'ul';
  if ( html.indexOf('<td') === 0 || html.indexOf('<th') ) toCreate = 'tr';
  if ( html.indexOf('<tr') === 0 ) toCreate = 'tbody';
  if ( html.indexOf('<thead') === 0 || html.indexOf('<tbody') === 0 ) toCreate = 'table';
  if ( html.indexOf('<option') === 0 ) toCreate = 'select';
  const tempParent = document.createElement(toCreate);
  tempParent.innerHTML = html;
  const result = [];
  for ( let i = 0; i < tempParent.childNodes.length; i++ ) {
    result.push(tempParent.childNodes[i]);
  }

  return result;
}

// 方法二
function downloadImageByCreateCanvas(imgsrc, name) {
  const image = new Image();
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous');
  image.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    const event = new MouseEvent('click');
    a.download = name || 'photo';
    a.href = url;
    a.dispatchEvent(event);
  };
  image.src = imgsrc;
}

// 方法四
function downloadImageByFetch(url, name) {
  download(url, name);
  
  function toDataURL(url) {
    return fetch(url)
        .then((response) => {
          return response.blob();
        }).then(blob => {
          return URL.createObjectURL(blob);
        });
  }

  async function download(url, name) {
    const a = document.createElement('a');
    a.href = await toDataURL(url);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

function createIsMedia() {
  const video = ['mp4', 'mov', 'avi', 'rmvb', 'rm', 'flv', 'mp4', '3gp', 'asf', 'wmv', 'navi', 'mkv', 'f4v', 'qt'];
  const image = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'psd', 'tiff', 'tga', 'eps'];
  const audio = ['mp3', 'wav', 'mpeg-4', 'mpeg', 'wma', 'amr', 'aac', 'mpg', 'm4a'];

  return function (ext) {
    if ([...video, ...image, ...audio].includes(ext)) {
      return true;
    }
    return false;
  }
}

// txt文件的处理相对简单，只需要增加以下两步就行了，url为文件下载路径
const blob = new Blob([url]);
a.href = URL.createObjectURL(blob);

