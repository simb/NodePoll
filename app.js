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

	var results,
		question;
	
  	// Add a connect listener
	socket.on('connection', function(client){ 
		if ( question ) {
			client.send(question);
		}
		
	  // Success!  Now listen to messages to be received
	  client.on('message',function(msg){ 
		console.log(msg.type);
	    if (msg.type === types.MESSAGE_TYPE_QUESTION) {
		 	results = {};
			question = msg;
			console.log('Sending Question');
			client.broadcast(msg);
			for ( var i=0;i<msg.options.length;i++){
				results[msg.options[i]] = 0;
			}
			var ans = {type:types.MESSAGE_TYPE_RESULTS, options: results};
			client.broadcast(ans);
			client.send(ans);
		}
		if (msg.type === types.MESSAGE_TYPE_VOTE) {
			console.log('Sending Results');
			
			results[msg.answer] += 1;
			var ans = {type:types.MESSAGE_TYPE_RESULTS, options: results};
			client.broadcast(ans);
			client.send(ans);
		}
	
	  });
	  client.on('disconnect',function(){
	    console.log('Client has disconnected');
	  });
	
	
});