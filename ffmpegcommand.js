const exec = require('child_process').exec;

executecommand = (command) => {
  exec(command, (e, stdout, stderr) => {
    console.log(e, stdout, stderr);

  });
}

setTimeout(function(){
	executecommand('ffmpeg -r 30 -i /dev/video0 -r 6 -vcodec libx264 -tune zerolatency -b 1200k -f mpegts udp://localhost:1234');
 }, (10 * 1000));

//executecommand('ffmpeg -i /dev/video0 -vcodec libx264 -tune zerolatency -b 1200k -f mpegts udp://localhost:1234');
