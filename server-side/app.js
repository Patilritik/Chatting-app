
// adding modules and creating server 

const express = require('express');
const app = express();

const http = require('http');

const path = require("path")
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server);
const names = {};

app.use(express.static(path.join(__dirname,'../Client-Side')));

// For reaching index.html file by path module 
const temp_path = path.join(__dirname,'../Client-Side');


//index file  By routing 
app.get('/', (req, res) => {
  return res.sendFile(temp_path + '/index');
});


// when connection establish 
io.on('connection', (socket) => {
  
  // if new user joined the chat then this event occurs
  socket.on("new-user",(name)=>{
    // sends message to everyone that a user with the given name joined the chat
    socket.broadcast.emit('User-joined',name);
    console.log(socket.id);
  })

  // if user sends a msg this "send" event occurs
  socket.on("send",(message)=>{
      socket.broadcast.emit('receive',message);
      console.log(`User sends a message => ${message}`);
  });
  // if someone leave the chat 
   socket.on('disconnect',() => {
    socket.broadcast.emit("left");
    console.log(`user disconnected`);
   });
});

server.listen(3000, () => {
  console.log('listening on :3000');
});
