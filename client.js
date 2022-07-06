$(document).ready(function () {
    var socket = io.connect('http://localhost:8008');

    socket.on('draw', function(data) {
      .draw(data.x, data.y, data.type);
    });

});