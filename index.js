var ws = require("ws")

wss = new ws.Server({port: 8080});
wss.on("connection",function() {
	console.log("hi");
})
