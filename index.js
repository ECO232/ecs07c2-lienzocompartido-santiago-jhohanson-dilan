const e = require('express');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
        console.log('un cliente se ha conectado');

    socket.on('enviar-elemento', (elemento) => {
        io.emit('elemento-recibido', elemento);
    });

    socket.on('enviar-cursor', (elemento) => {
        io.emit('cursor-recibido', elemento);
    });

    socket.on('disconnect', () => {
        console.log('un cliente se ha desconectado');
    });
});

server.listen(port, () => {
    console.log(`servidor escuchando el puerto ${port}`);
});