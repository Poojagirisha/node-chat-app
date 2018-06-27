const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');
const {generateMessage} = require('./utils/message');

const {generateLocationMessage} = require('./utils/message');
const {isRealString}=require('./utils/validation');
const {Users}=require('./utils/users');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;

//console.log(__dirname+'/../public');
//console.log(publicPath);
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
console.log('new user connected');



socket.on('join',(params,callback)=>{
if(!isRealString(params.name)||!isRealString(params.room)){
    return callback('name and room name are required');
}
socket.join(params.room);
users.removeUser(socket.id);
users.addUser(socket.id,params.name,params.room);

io.to(params.room).emit('updateUserList',users.getUserList(params.room));

socket.emit('newMessage',generateMessage('Admin', 'welcome to chat app'));

socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
callback();
});
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

socket.on('createMessage',(message,callback)=>{
    console.log('create message',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
        // from:message.from,
        // text:message.text,
        // createdAt:new Date().getTime()
    // );
    
// socket.broadcast.emit('newMessage',{
//     from:message.from,
//     text:message.text,
//     createdAt:new Date().getTime()
// });   
});

socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
});


socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);

    if(user){
        io.to(user.room).emit('updateUserList',users.getUserList(user.room));
        io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
    }
   // console.log('user was disconnected');
});
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});