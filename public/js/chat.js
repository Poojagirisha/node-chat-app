var socket=io();

function scrollToBottom (){
 var messages=jQuery('#messages');
var newMessage=messages.children('li:last-child')

 var clientHeight=messages.prop('clienHeight');
 var scrollTop=messages.prop('scrollTop');
 var scrollHeight=messages.prop('scrollHeight');
var newMessageHeight=newMessage.innerHeight();
var lastMessageHeight=newMessage.prev().innerHeight();


 if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
     //console.log('should scroll');
     message.scrollTop(scrollHeight);
 }
}



 socket.on('connect',function(){
    //console.log('connected to server'); 
    var params=jQuery.deparam(window.location.search);
    socket.emit('join',params,function(err){
        if(err){
            alert(err);
            window.location.href='/';
        }else{
            console.log('no error');
        }
    });
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

socket.on('updateUserList',function(users){
    var ol=jQuery('<ol></ol>');

    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});


    socket.on('newMessage',function(message){
        var formattedTime=moment(message.createdAt).format('h:mm a');
        var template=jQuery('#message-template').html();
        var html= Mustache.render(template,{
            //text: (`${message.from} ${formattedTime} :${message.text}`)
            text: message.text,
            from: message.from,
            createdAt: formattedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();
        //console.log('newMessage',message);
        // var formattedTime=moment(message.createdAt).format('h:mm a');
        // var li =jQuery('<li></li>');
        // li.text(`${message.from} ${formattedTime} :${message.text}`);

        // jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage', function(message){
        // var li=jQuery('<li></li>');
        var formattedTime=moment(message.createdAt).format('h:mm a');
        var template=jQuery('#location-message-template').html();
        var html= Mustache.render(template,{
            //text: (`${message.from} ${formattedTime} :${message.text}`)
            from: message.from,
            url: message.url,
            createdAt: formattedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();

        // var a=jQuery('<a target="_blank"> my current location</a>');
        // li.text(`${message.from} ${formattedTime}:`);
        // a.attr('href',message.url);
        // li.append(a);
        // jQuery('#messages').append(li);
    });

    // socket.emit('createMessage',{
    //     from:'frank',
    //     text:'hei this is frank'
    // },function(data){
    //     console.log('got it',data);
    // });

    jQuery('#message-form').on('submit',function(e){
        e.preventDefault();

        var messageTextbox=jQuery('[name=message]');

        socket.emit('createMessage',{
            from:'User',
            text:messageTextbox.val()
        },function(){
            messageTextbox.val('')
        });
    });


    var locationButton=jQuery('#send-location');
    locationButton.on('click',function(){
        if(!navigator.geolocation){
            return alert('Geolocation not supported by your browser');
        }
locationButton.attr('disabled','disabled').text('sending location...');

        navigator.geolocation.getCurrentPosition(function(position){
            locationButton.removeAttr('disabled').text('send location');
            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude,
                longitude:position.coords.longitude
            });
            console.log(position);
        },function(){
            locationButton.removeAttr('disabled').text('send location');
            alert('uable to fetch location');
        });
    });