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

// 方法三、使用ly-downloader

