const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`Server is up and running on ${port}`)
})
