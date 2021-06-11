const serveStatic = require('serve-static')
var express = require('express'),
    app = express(),
    p = 3011,
    server = app.listen(p, () => console.log(`Running @ Port ${p}`)),
    socket = require('socket.io'),
    io = socket(server)
app.use(express.static('public'))
io.sockets.on('connection', newCon)

function newCon(socket) {
    // console.log('Challenger Approaching ' + socket.id + '!')
    socket.on('Reset', (stuff) => socket.broadcast.emit('send', stuff))
}