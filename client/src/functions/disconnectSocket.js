const disconnectSocket = (socket) => {
  if(socket) socket.close()
}

export default disconnectSocket
