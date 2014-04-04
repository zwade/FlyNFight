console.log("running")
var can;
var env = {};
var ws;


$(window).load(function() {
    can = new fabric.Canvas("can");
    can.setHeight(640);
    can.setWidth(860);
    
    init();
})

init = function() {
    env.players = [];
    env.players[0] = new fabric.Circle({radius:40, fill: "#f00", selectable: false})
    env.players[0].hasControls = false;
    can.add(env.players[0]);
    can.renderAll();
    
    ws = new WebSocket("ws://localhost:5000");
    ws.onopen = function() {
	ws.send("req nam");
    }
    ws.onmessage = function(msg) {
    	if (!msg) {
		return
	}
    	data = msg.data.split(" ");
	cmd = data[0]
	arg = data[1];
	
	dat = "";
	for (var i = 2; i < data.length-1; i++) {
		data += data[i]+" "
	}
	dat += data[data.length-1]

	switch (cmd) {
		case "set":
			if (arg == "uid") {
				env.UID = dat
			}
			return
	}
	
	
    }
}
