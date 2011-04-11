var express = require('express'),  
    io = require('socket.io'),
	sys = require('sys');


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
		  client.send('This is a message from the server!  ' + new Date().getTime());
		},5000);
	  // Success!  Now listen to messages to be received
	  client.on('message',function(event){ 
	    console.log('Received message from client!',event);
		client.send('Echo: ' + event );
		client.broadcast('Echo: ' + event );
	  });
	  client.on('disconnect',function(){
	    //clearInterval(interval);
	    console.log('Client has disconnected');
	  });
	
	
});