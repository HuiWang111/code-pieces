/**
 * @description <a>的download属性仅支持同源url，因此对不同源的文件需要额外的处理才能点击直接下载
 */
function downloadFile(data, cb) {
  const url = parseUrl(data);
  const fileName = parseFileName(data, url);
  if (url) {
    if (isCrossOrigin(url)) {
      saveFile(url, fileName);
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    }
  } else {
    cb('当前无可导出数据');
  }

  function parseUrl(data) {
    let url = '';
    if (data) {
      if(_.isArray(data) && data.length > 0 && data[0].url) {
        url = data[0].url;
      }else if(data.url) {
        url = data.url;
      } else {
        url = data;
      }
    }

    return url.startsWith('http') ? url : `http://${url}`;
  }

  function parseFileName(data, url) {
    let fileName = '未知文件.zip';
    if (data) {
      if (_.isArray(data) && data[0] && data[0].fileName) {
        fileName = data[0].fileName;
      } else if (data.fileName) {
        fileName = data.fileName;
      } else {
        if (url) {
          const arr = url.split('/');
          const len = arr.length;
          if (len > 0) {
            fileName = decodeURI(arr[len - 1]);
          }
        }
      }
    }

    return fileName;
  }

  function isCrossOrigin(url, defaultProtocol = 'http:') {
    const getProtocol = url => {
      const arr = url.split('//');
      return arr.length > 1 ? arr[0] : defaultProtocol;
    }
    const getHost = url => {
      const arr = url.split('//');
      const Url = arr.length > 1 ? arr[1] : arr[0];
      const host = Url.split('/')[0].split(':');
      return {
        hostname: host[0],
        port: host.length > 1 ? host[1] : ''
      }
    }

    const protocol = getProtocol(url);
    const { hostname, port } = getHost(url);

    return (protocol !== window.location.protocol) || (hostname !== window.location.hostname) || (port !== window.location.port);
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

