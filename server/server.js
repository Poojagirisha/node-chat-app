const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');
const {generateMessage} = require('./utils/message');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;

//console.log(__dirname+'/../public');
//console.log(publicPath);
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
console.log('new user connected');

socket.emit('newMessage',generateMessage('Admin', 'welcome to chat app'));

socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));

// socket.emit('newMessage',{
//     from:'pooja',
//     text:'see you then',
//     createdAt:1234
// });
// socket.emit('newEmail',{
//     from:'pooja.h.gowda@gmail.com',
//     text:'hey this is pooja',
//     createAt:123
// });

// socket.on('createEmail',(newEmail)=>{
// console.log('createEmail',newEmail);
// });

socket.on('createMessage',(message)=>{
    console.log('create message',message);
    io.emit('newMessage',generateMessage(message.from,message.text)
        // from:message.from,
        // text:message.text,
        // createdAt:new Date().getTime()
    );
    
// socket.broadcast.emit('newMessage',{
//     from:message.from,
//     text:message.text,
//     createdAt:new Date().getTime()
// });   
});



socket.on('disconnect',()=>{
    console.log('user was disconnected');
});
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});