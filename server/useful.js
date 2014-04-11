var WebSocketServer = require('ws').Server
	, http = require('http')
	, express = require('express')
	, app = express()
	, port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);
console.log('http server listening on %d', port);
var wss = new WebSocketServer({server: server});
console.log('websocket server created');

var conns = {}

var genUID = function() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	for( var i=0; i < 8; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;	
}

wss.on('connection', function(ws) {

	console.log('websocket connection open');
	if (!ws.UID) {
		var uid = genUID();
		ws.UID = uid;
		conns[uid] = ws;
		ws.send("set uid "+uid);
	}

	ws.on('message', function(data) {
		ws.send("data received "+data);
	})
	


	ws.on('close', function() {
		console.log('websocket connection close');
		delete conns[ws.UID]
	});
});
