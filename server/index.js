const {Server, Socket } = require('socket.io')

const io = new Server(8000);

const app = require('express')

io.on('connection',socket=>{
  console.log(`Socket COnnected `,socket.id);
  
})