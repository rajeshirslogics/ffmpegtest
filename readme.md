ffmpeg -f dshow -i video="USB_Camera" -framerate 5 -vcodec libx264
 Command
 ffmpeg -f dshow -i video="USB_Camera" -vcodec libx264 -tune zerolatency -b 600k -f mpegts udp://localhost:1234

 ffmpeg -f dshow -i video="HD Pro Webcam C920" -vcodec libx264 -tune zerolatency -b 600k -f mpegts udp://localhost:1235


 ffmpeg -list_devices true -f dshow -i dummy

 ffmpeg -f dshow -i video="USB_Camera" -framerate 4 -vcodec libx264 -tune zerolatency -f mpegts udp://localhost:1234

ffmpeg -f dshow -i video="USB_Camera" -r 5 -vcodec libx264 -tune zerolatency -b 600k -f mpegts udp://localhost:1234

ffmpeg -r 30 -f dshow -i video="USB_Camera" -filter:v "minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120':setpts=2.0*PTS" -vcodec libx264 -tune zerolatency -b 600k -f mpegts udp://localhost:1234


ffmpeg -r 30 -f dshow -i video="USB_Camera" -r 5 -vcodec libx264 -tune zerolatency -b 1200k -f mpegts udp://localhost:1234

ffmpeg -f dshow -i video="USB_Camera" -r 5  -vcodec libx264 -tune zerolatency -b 600k -f mpegts udp://localhost:1234