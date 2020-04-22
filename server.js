var app=require('http').createServer(handler)
var ws=require('nodejs-websocket')
var fs=require('fs')
app.listen(8081)
console.log("1")
console.log("2")
console.log("3")
console.log("4")
console.log("6")
function handler(req,res){
  fs.readFile(__dirname+'/web/index.html',function(err,data){
    if(err){
      res.writeHead(500)
      return res.end('error ')
    }
    res.writeHead(200)
    res.end(data)
  })
}
console.log("5")
console.log("9")
var server=ws.createServer(function(conn){
  console.log('new conneciton')
  conn.on("text",function(str){
    broadcast(server,str)
  })
  conn.on("close",function(code,reason){
    console.log('connection closed')
  })
}).listen(5000)
function broadcast(server, msg) {
  server.connections.forEach(function (conn) {
    conn.sendText(msg)
  })
}