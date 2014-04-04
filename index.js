var WebSocketServer = require('ws').Server
	, http = require('http')
	, express = require('express')
	, app = express()
	, port = process.env.PORT || 5000;
var words = require("./words")

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
var genName = function() {
	var adj = words.adj[Math.floor(Math.random()*(words.adj.length-1))]
	var noun = words.noun[Math.floor(Math.random()*(words.noun.length-1))]
	return adj+"-"+noun
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
		handleMessage(ws, data);
	})
	


	ws.on('close', function() {
		console.log('websocket connection close');
		delete conns[ws.UID]
	});
});

var handleMessage = function(ws, data) {
	data = data.toString();
	var msg = data.split(" ");
	var cmd = msg[0];
	var arg = msg[1];

	var  dat = "";
	for (i = 2; i < msg.length-1; i++) {
		dat += msg[i]+" "
	}
	dat += msg[msg.length-1];
	
	switch (cmd) {
		case "tel":
			if (conns[arg]) {
				conns[arg].send("frm "+ws.UID+" "+dat)
				ws.send("inf log 101")
			} else {
				ws.send("inf err 201")
			}
			return
		case "prt":
			if (! arg) {
				console.log(conns);
			} else {
				console.log(arg+" "+dat);
			}
			ws.send("inf log 101")
			return

		case "req":
			switch (arg) {
				case "uid":
					if (conns[dat]) {
						ws.send("inf err 202")
						return
					}
					delete conns[ws.UID]
					ws.UID = dat
					conns[dat] = ws
					ws.send("set uid "+dat);
					return
				case "nam":
					var name = genName();
					while (true) {
						if (!conns[name]) {
							break;
						}
						name = genName();
					}
					delete conns[ws.UID]
					ws.UID = name;
					conns[name] = ws;
					ws.send("set uid "+name);
					return;

			}
			return
	}
}
