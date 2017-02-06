var canvas = document.getElementById('canvas-container')
var ctx = canvas.getContext('2d')
var time = 0
var video = document.createElement('video')
var socket = io.connect("http://localhost:8000/imageCarrier")
var pixelHandler = {
    isRunning:false,
    handlePixel:function(){
      new Promise((resolve,reject)=>{
          var imageData = ctx.getImageData(0,0,canvas.width,canvas.height)
          var data = imageData.data
          var w = canvas.width
          var h = canvas.height
          console.log(h)
          var pixels = []
          var n = 1;
          var pixel = new Array()
          for(var i=0;i<data.length;i+=4) {
              if(n%w == 0) {
                pixels.push(pixel)
                pixel = new Array()
              }
              else {
                  var gr_pixel = Math.floor(data[0]*0.34+data[1]*0.31+data[2]*0.35+data[3]*0.33)
                  pixel.push(gr_pixel)
              }
              n++;
          }
          resolve(pixels)
      }).then((pixels)=>{socket.emit('draw',pixels)})
    }
}
var ctxWorker = new Worker('js/ctxWorker.js')
socket.on('ack',(data)=>{
    console.log("acknowledged")
})
video.autoplay = true
window.onresize = () =>{
    setDimensions()
}
var setDimensions = () => {
    canvas.width = window.innerWidth/4
    canvas.height = window.innerWidth/4
    video.width = canvas.width
    video.height = canvas.height
}
setDimensions()
navigator.getUserMedia = navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia
var successCallback = (stream) => {
    video.src = window.URL.createObjectURL(stream)
}
var failureCallback = (err) => {
    console.log(err)
}

navigator.getUserMedia({audio:false,video:true},successCallback,failureCallback)
function clone(objectToBeCloned) {
    if(!(objectToBeCloned instanceof Object)) {
        return objectToBeCloned
    }
    var Constructor = objectToBeCloned.constructor
    var objectToClone = new Constructor()
    for(var prop in objectToBeCloned) {
        objectToClone[prop] = clone(objectToCloned[prop])
    }
    console.log(objectToClone)
    return objectToClone
}
setInterval(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(video,0,0,canvas.width,canvas.height)
    pixelHandler.handlePixel()
    time++
},1)
