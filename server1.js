var ffmpeg = require('fluent-ffmpeg');
//ffmpeg.setFfmpegPath(ffmpegPath);
var command = ffmpeg('/dev/video0');
var timemark = null;

// 6 consecutive 1920x1080 frames, held 6 seconds each, 30fps, with m4a audio, watermarked
command
    .on('end', onEnd)
    .on('start', function (commandLine) {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
    })
    .on('progress', onProgress)
    .on('error', onError)
    //.input('/dev/video0')
    //.inputOptions('-f dshow')
    //.inputFPS(1 / 6)
    //.videoFilter(["movie=assets/demo2/soa-watermark.png [watermark]; [in][watermark] overlay=10:main_h-overlay_h-10 [out]"])
    //.input('assets/demo2/folds-of-spacetime.m4a')
    .addOptions([
        '-vcodec libx264',
        '-tune zerolatency',
        '-b 1200k',
        '-f mpegts'
    ])
    .output('udp://localhost:1234')
    //.outputFPS(5)
    .run();

function onProgress(progress) {
    if (progress.timemark != timemark) {
        timemark = progress.timemark;
        console.log('Time mark: ' + timemark + "...");
    }
}

function onError(err, stdout, stderr) {
    console.log('Cannot process video: ' + err.message, stdout, stderr);
}

function onEnd() {
    console.log('Finished processing');
}


