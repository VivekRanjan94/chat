const io = require('socket.io')(4000, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

io.on('connection', (socket) => {
  const id = socket.handshake.query.id
  // socket.id
  console.log(id)
  socket.join(id)
})
