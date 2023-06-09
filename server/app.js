import express from 'express';
import { Server } from 'socket.io';
const app = express();

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:5173",
  }
})

const data = [{ id: 1, name: 'a', age: 11, score: 123 }, { id: 2, name: 'b', age: 52, score: 534 }, { id: 3, name: 'c', age: 37, score: 753 }]

io.on('connection', (socket) => {

  socket.emit('loadData', data)

  socket.on('changeStatus', (status) => {
    io.emit('changeStatus', status)
  })

  socket.on('updatedUserList', (data) => {
    io.emit('updatedUserList', data)
  })
})

app.listen(8000, () => {
  console.log('Server is running OK')
})