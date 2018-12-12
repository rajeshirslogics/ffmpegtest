//var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg');
//ffmpeg.setFfmpegPath(ffmpegPath);
var command = ffmpeg();
var timemark = null;

// 6 consecutive 1920x1080 frames, held 6 seconds each, 30fps, with m4a audio, watermarked
command
  .on('end', onEnd)
  .on('progress', onProgress)
  .on('error', onError)
  .input('video=USB_Camera')
  .inputOptions('-f dshow')
  .inputFPS(1 / 6)
  //.videoFilter(["movie=assets/demo2/soa-watermark.png [watermark]; [in][watermark] overlay=10:main_h-overlay_h-10 [out]"])
  //.input('assets/demo2/folds-of-spacetime.m4a')
  .addOptions([
    '-vcodec libx264',
    '-tune zerolatency',
    '-b 600k',
    '-f mpegts'
  ])
  .output('udp://localhost:1234')
  .outputFPS(5)
  .run();

function onProgress(progress) {
  if (progress.timemark != timemark) {
    timemark = progress.timemark;
    console.log('Time mark: ' + timemark + "...");
  }
}

function onError(err, stdout, stderr) {
  console.log('Cannot process video: ' + err.message, stdout, stderr, command);
}

function onEnd() {
  console.log('Finished processing');
}


/*
function startpush(type) {
    var outputh = 'rtsp://192.168.1.155:10554/ffmpegtext';
    var ffmpegPath = "./ffmpeg_bin/ffmpeg.exe";
    var ffmpeg = require('fluent-ffmpeg');
    var fs = require('fs');
    var command;
    if (type == 'push') {
        command = ffmpeg('video=HD USB Camera')
            .setFfmpegPath(ffmpegPath)
            .inputOptions('-f dshow')
            .on('start', function(commandLine) {
                console.log("start push......." + commandLine);
                console.log("start command......." + command);
                global.ffmpeg = {
                    "command": command
                };
            })
            .on('end', function() {
                console.log("storp push........")
            })
            .on('error', function(err, stdout, stderr) {
                console.log('error:' + err.message);
                console.log('stdout:' + stdout);
                console.log('stderr:' + stderr);
                command.kill();
            })
            .addOptions([
                // '-vcodec libx264',
                '-rtsp_transport tcp',
                '-f rtsp'
            ])
            .pipe(outputh, { end: true });
    } else {
        var command = global.ffmpeg.command;
        console.log("start kill......." + command);
        command.kill('SIGKILL');
    }

}*/