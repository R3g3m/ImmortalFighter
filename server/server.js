var PORT = 8008;
 
var options = {
//    'log level': 0
};
 
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server, options);
server.listen(PORT);
 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (client) {
    
    client.on('drawClick', function(data) {
      socket.broadcast.emit('draw', {
        
      });
    });
});