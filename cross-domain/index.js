//postMessage
//窗口A(http://A.com)向跨越的窗口B(http://B.com)发送信息
window.postMessage("data", "http://b.com");

//B窗口监听
window.addEventListener("message", function (event) {
	console.log(event.origin);// http://A.com
	console.log(event.source);// A window
	console.log(event.data);// data!
});


//webSocket
let ws = new WebSocket("wss://echo.webSocket.org");

ws.onopen = function (evt) {
	console.log("Connection open...");
	ws.send('hello webSocket!');
}

ws.onmessage = function (evt) {
	console.log("Received Message:" + evt.data);
	ws.close();
}

ws.onclose = function (evt) {
	console.log("Connection closed");
}

//CORS 【参考资料】(http://www.ruanyifeng.com/blog/2016/04/cors.html)
fetch("/some/url", {
	method: "get",
}).then(function (response) {

}).catch(function (err) {

});