
const socket = io();

// to get input from the user by his name  
const user_name = prompt("Please Give your name ");
const send_container = document.getElementById("send-container")

const messageInput = document.getElementById("messageInput"); 

const All_messaeges = document.getElementById("All_messages");


// sound on receiver side 
const audiorec = new Audio("my_favorite_notificati.mp3");
// sound on leave the chat 
const audioleft = new Audio("blopp.mp3");

// if new user joins the chat emit new-user event to all connection 
socket.emit("new-user",user_name);

// when user-joined event successfully achieved then to all other connected user can see who joined    
socket.on('User-joined',(name)=>{
    append(`${name} joined`,'receiver');
})

// append function to append messages either on reciever as well as sender side and append message to the existed All messages container 
const append = (message,position)=>{
    const messageToAppend = document.createElement('div');
    messageToAppend.innerText = message;
    messageToAppend.classList.add('message');
    messageToAppend.classList.add(position);
    All_messaeges.append(messageToAppend);
}

// when user receives message
socket.on("receive",(message)=>{
    audiorec.play();
    append(message,'receiver');

});
// when user left the chat 
socket.on("left" ,()=>{
   audioleft.play();
   append("Left the chat ", "receiver");
})
// when user successfully submit the message (sends the message) then it will sends to all connected users
send_container.addEventListener('submit',(e)=>{
    const message = messageInput.value;
    append(`You : ${message}`,'sender');    
    socket.emit('send', message);
    messageInput.value ='';
})
