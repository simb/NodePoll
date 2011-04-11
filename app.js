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
		
		var interval = setInterval(function() {
		  client.send(	{type: types.MESSAGE_TYPE_QUESTION, 
							question: "How are you?", 
							answers: ["Great","Good","Fair","Poor"]
						});
			console.log('sending question');
		},5000);
	  // Success!  Now listen to messages to be received
	  client.on('message',function(event){ 
	    if (msg.type === types.MESSAGE_TYPE_QUESTION) {
			
		}
	
		console.log('Received message from client!',event);
		//client.send('Echo: ' + event );
		//client.broadcast('Echo: ' + event );
	  });
	  client.on('disconnect',function(){
	    //clearInterval(interval);
	    console.log('Client has disconnected');
	  });
	
	
});