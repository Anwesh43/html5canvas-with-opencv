var express = require('express')
var socketio = require('socket.io')
var http = require('http')
var path = require('path')
var app = express()
var server = http.createServer(app)
var io = socketio(server)
var executor = require('./pixelScriptExecutor')
var n = 0
app.use(express.static(path.join(__dirname,'public')))
io.of('/imageCarrier').on('connection',(socket)=>{
    console.log("connected to a client")
    socket.emit("ack",{msg:"Welcome to server side rendering"})
    socket.on("draw",(data)=>{
        executor.executePixelScript(data,function(err,data){
            console.log(err)
            console.log(data)
        })
        n++
    })
})
server.listen(8000,()=>{
    console.log("server has started learning")
})
