const mongoose = require('mongoose');
const Mark = require('../database/models/mark')

function socketController(socket) {
    constole.log(`User ${socket.id} connected`)
    socket.on("new marker", async (id) => {
        const marker = await Mark.findById(id);
        if(marker) socket.broadcast.emit('fetch new', marker)
    })
    socket.on("update marker", async (id) => {
        const marker = await Mark.findById(id);
        if(marker) socket.broadcast.emit('fetch update', marker)
    })
    socket.on("delete marker", async (id) => {
        socket.broadcast.emit('fetch delete', id)
    })
}

module.exports = socketController;