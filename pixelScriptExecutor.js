var executor = {}
var childProcess = require('child_process')
var q = require('q')
var fs = require('fs')
var file_name = "pixels.txt"
var seqQueue = require('seq-queue')
var queue = seqQueue.createQueue(10000)
executor.executePixelScript = (pixels,cb)=>{
    queue.push((task)=>{
        var pixelsStr = JSON.stringify(pixels)
        fs.writeFileSync(file_name,pixelsStr)
        childProcess.exec(`python image_contour_executor.py`,function(err,stdout,stderr){
          if(err == null) {
              cb(null,stdout)
              task.done()
          }
          else {
              cb(err,null)
              task.done()
          }
      })
    })

}
module.exports = executor
