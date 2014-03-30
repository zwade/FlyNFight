var ws = require("ws")

wss = new ws.Server({port: process.env.PORT || 8080});
wss.on("connection",function() {
	console.log("hi");
})

console.log(process.env.PORT);
