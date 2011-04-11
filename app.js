var express = require('express'),  
    io = require('socket.io'),
	sys = require('sys'),
	types = require('./public/js/types');


var server = express.createServer();

server.configure( function(){
	server.use(express.static(__dirname + '/public'));
})
server.listen(8080);

// socket.io 
var socket = io.listen(server); 

	var results;
	
  	// Add a connect listener
	socket.on('connection', function(client){ 
		
		
	  // Success!  Now listen to messages to be received
	  client.on('message',function(msg){ 
		console.log(msg.type);
	    if (msg.type === types.MESSAGE_TYPE_QUESTION) {
		 	results = {};
			console.log('Sending Question');
			client.broadcast(msg);
		}
		if (msg.type === types.MESSAGE_TYPE_VOTE) {
			console.log('Sending Results');
			console.log(msg);
			results[msg.answer] += 1;
			client.broadcast(results);
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