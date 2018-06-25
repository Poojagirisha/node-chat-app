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
        var li =jQuery('<li></li>');
        li.text(`${message.from}:${message.text}`);

        jQuery('#messages').append(li);
    });

    // socket.emit('createMessage',{
    //     from:'frank',
    //     text:'hei this is frank'
    // },function(data){
    //     console.log('got it',data);
    // });

    jQuery('#message-form').on('submit',function(e){
        e.preventDefault();
        socket.emit('createMessage',{
            from:'User',
            text:jQuery('[name=message]').val()
        },function(){

        });
    });
