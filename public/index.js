var canvas = document.getElementById('canvas-container')

var ctx = canvas.getContext('2d')
var video = document.createElement('video')
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
setInterval(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(video,0,0,canvas.width,canvas.height)
},1)
