var express = require('express'),  
    io = require('socket.io'),
	sys = require('sys'),
	types = require('./public/js/types');


var server = express.createServer();

server.configure( function(){
	server.use(express.staticProvider(__dirname + '/public'));
})
server.listen(8080);

// socket.io 
var socket = io.listen(server); 

	
  	// Add a connect listener
	socket.on('connection', function(client){ 
		
		
	  // Success!  Now listen to messages to be received
	  client.on('message',function(msg){ 
		console.log( msg, msg.type, types.MESSAGE_TYPE_QUESTION);
		//client.send({type:"message",foo:"aaron"});
	    if (msg.type === types.MESSAGE_TYPE_QUESTION) {
			console.log('Sending Question');
			client.broadcast(msg);
		}
	
		//console.log('Received message from client!',msg);
		//client.send('Echo: ' + event );
		//client.broadcast('Echo: ' + event );
	  });
	  client.on('disconnect',function(){
	    //clearInterval(interval);
	    console.log('Client has disconnected');
	  });
	
	
});