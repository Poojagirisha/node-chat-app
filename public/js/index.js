var socket=io();

 socket.on('connect',function(){
    console.log('connected to server'); 
    // socket.emit('createEmail',{
    //     to:'jen@example.com',
    //     text:'hey this is pooja'
    // });
//     socket.emit('createMessage',{
//         from:'pooja',
//         text:'hey this is pooja'
//     });
 });


        socket.on('disconnect',()=>{
            console.log('disconnected from server');
        });

    // socket.on('newEmail',function(email){
    //     console.log('New Email',email);
    // });

    socket.on('newMessage',function(message){
        console.log('newMessage',message);
    });