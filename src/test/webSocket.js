/**
 * Created by WengHaoping on 2017/6/13.
 */
// 在支持WebSocket的浏览器中，在创建socket之后。可以通过onopen，onmessage，onclose即onerror四个事件实现对socket进行响应

var ws = new WebSocket('ws://localhost:8080');
// 当websocket创建成功时，即会触发onopen事件
ws.onopen = function () {
  console.log('open');
  ws.send('hello');
};

// 当客户端收到服务端发来的消息时，会触发onmessage事件，参数evt.data中包含server传输过来的数据
ws.onmessage = function (evt) {
  console.log(evt.data);
};

// 当客户端收到服务端发送的关闭连接的请求时，触发onclose事件
ws.onclose = function (evt) {
  console.log('WebSocketClosed!');
};

// 如果出现连接，处理，接收，发送数据失败的时候就会触发onerror事件
ws.onerror = function (evt) {
  console.log('WebSocketError!');
};
