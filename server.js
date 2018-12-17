/**
 * Created by Andrew D.Laptev<a.d.laptev@gmail.com> on 30.03.15.
 */

const app = require('express')(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  rtsp = require('rtsp-ffmpeg'),
  {
    parse
  } = require('ffmpeg-device-list-parser');

//parse((result) => console.log(result));
// use rtsp = require('rtsp-ffmpeg') instead if you have install the package
server.listen(6147, function () {
  console.log('Listening on localhost:6147');
});

//udp://localhost:1234/1234 need an additional path or the lib can not ge tthe streaming
var cams = [
  'udp://localhost:1234'
].map(function (uri, i) {
  var stream = new rtsp.FFMpeg({
    input: uri,
    resolution: '600x400',
    //quality: 5,
    //rate: 30
  });
  stream.on('start', function () {
    console.log('stream ' + i + ' started');
  });
  stream.on('stop', function () {
    console.log('stream ' + i + ' stopped');
  });
  return stream;
});

cams.forEach(function (camStream, i) {
  var ns = io.of('/cam' + i);
  ns.on('connection', function (wsocket) {
    console.log('connected to /cam' + i);
    var pipeStream = function (data) {
      wsocket.emit('data', data);
    };
    camStream.on('data', pipeStream);

    wsocket.on('disconnect', function () {
      console.log('disconnected from /cam' + i);
      camStream.removeListener('data', pipeStream);
    });
  });
});

io.on('connection', function (socket) {
  socket.emit('start', cams.length);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});