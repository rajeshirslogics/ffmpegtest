ffmpeg -f dshow -i video="USB_Camera" -framerate 5 -vcodec libx264
 Command
 ffmpeg -f dshow -i video="USB_Camera" -vcodec libx264 -tune zerolatency -b 600k -f mpegts udp://localhost:1234

 ffmpeg -f dshow -i video="HD Pro Webcam C920" -vcodec libx264 -tune zerolatency -b 600k -f mpegts udp://localhost:1235


 ffmpeg -list_devices true -f dshow -i dummy

 ffmpeg -f dshow -i video="USB_Camera" -framerate 4 -vcodec libx264 -tune zerolatency -f mpegts udp://localhost:1234

https://www.kurokesu.com/main/2016/01/16/manual-usb-camera-settings-in-linux/
