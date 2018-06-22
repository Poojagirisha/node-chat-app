const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

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

socket.emit('newMessage',{
    from:'pooja',
    text:'see you then',
    createdAt:1234
});
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
});

socket.on('disconnect',()=>{
    console.log('user was disconnected');
});
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});