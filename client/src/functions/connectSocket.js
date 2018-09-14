import io from 'socket.io-client'
const socketUrl = "http://localhost:3231"


const connectSocket = () => {
  console.log("attempting connection");
  const socket = io(socketUrl)
  socket.on('connect', () => {
    socket.emit('USER_CONNECTED')
    console.log("Connected");
  })
  return socket
}

export default connectSocket
