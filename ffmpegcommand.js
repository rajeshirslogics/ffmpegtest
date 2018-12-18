const exec = require('child_process').exec;

executecommand = (command) => {
  exec(command, (e, stdout, stderr) => {
    console.log(e, stdout, stderr);
  });
}

streamcam = (device) => {
  setTimeout(function () {
    executecommand(`ffmpeg -r 30 -i /dev/video${device} -r 6 -vcodec libx264 -tune zerolatency -b 600k -f mpegts udp://localhost:123${device}`);
  }, (10 * 1000));
}

for (let index = 0; index < 2; index++) {
  streamcam(index);  
}
//executecommand('ffmpeg -i /dev/video0 -vcodec libx264 -tune zerolatency -b 1200k -f mpegts udp://localhost:1234');