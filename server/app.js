const express = require('express')
const app = express();
const { Server } = require('socket.io')

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:5173",
  }
})

const data = [{ id: 1, name: 'a', age: 11 }, { id: 2, name: 'b', age: 52 }, { id: 3, name: 'c', age: 37 }]

io.on('connection', (socket) => {
  console.log('connected');
  socket.emit('loadData', data)
})

app.listen(8000, () => {
  console.log('Server is running OK')
})