//Wang Jian
//CSE270E
//2017 Jan 20
//Assignment13
var express = require('express'),
    config = require('./server/configure'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);
    mongoose = require('mongoose');
app.set('port', process.env.PORT || 3640);
app.set('views', __dirname + '/views');
app = config(app);
mongoose.connect('mongodb://localhost/info', function(err,db){
    if(err){
       console.error(err);
    }else{
       console.log('connected'); 
    }
});
mongoose.connection.on('open', function() {
console.log('Mongoose connected.');
});
//app.get('/', function(req, res){
  // res.send('Hello World'); 
//});
http.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});

var sockets= [];
//dynamic count of connected sockets
var cnt=0;
//event handler for connection
//open socket connection
io.sockets.on('connection', function(socket){
		sockets.push(socket);
		console.log("new connection - " +socket.id);
                //open connection with timer0 info and recieve data
                socket.on('timer0 info', function(data){
                   //only emits to specific user
                   io.emit('timer0 info'+JSON.parse(data)["username"], data);
                });
                //open connection with timer1 info and recieve data
                socket.on('timer1 info', function(data){
                   //only emits to specific user
                   io.emit('timer1 info'+JSON.parse(data)["username"], data);
                });
                //open connection with timer2 info and recieve data
                socket.on('timer2 info', function(data){
                   //only emits to specific user
                   io.emit('timer2 info'+JSON.parse(data)["username"], data);
                });

                //and register the disconnect handler on the SOCKET - not on the listener 
		socket.on('disconnect',function() {
			//remove from array
			var s = [];
			var cnt=-1;
			for (var i=0,l=sockets.length;i<l;i++) {
				if (sockets[i].id !== socket.id) {
					s[++cnt] = sockets[i];
				}
			}
			console.log("Removing socket from array - oldCnt = " + sockets.length + " newcnt=" + s.length);
			sockets = s;
		});
});

