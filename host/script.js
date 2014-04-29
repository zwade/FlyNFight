console.log("running")
var can;
var env = {};
var ws;
var PSS;


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

	PSS = new PSServer("ws://localhost:5000");

	PSS.onName = function(name) {
		$("#uid").text(name);
	}

	PSS.onConnect = function(PSC) {
		console.log(PSC.UID+" opened");
		PSC.onData = function(data) {
			var msg = data.split(" ");
			if (msg[0] == 'mov') {
				console.log("Moved"+parseInt(msg[1],10)*Math.cos(parseInt(msg[2],10))+"left"+parseInt(msg[1],10)*Math.sin(parseInt(msg[2],10))+"up");
				env.players[0].animate('left', '+='+(parseInt(msg[1],10)*Math.cos(parseInt(msg[2],10))) , {
					duration:1000, //1000 ms
					onChange: can.renderAll.bind(can), 
				})
				env.players[0].animate('top', '+='+(parseInt(msg[1],10)*Math.sin(parseInt(msg[2],10))) , {
					duration:1000,
					onChange: can.renderAll.bind(can),
				})
				//env.players[0].left+=msg[1]*Math.cos(msg[2]);
				//env.players[0].top+=msg[1]*Math.sin(msg[2]);
				//can.renderAll();
			} else if (msg[0] == "set") {
				env.players[0].left = 860*parseFloat(msg[1]);
				env.players[0].top = 640*parseFloat(msg[2]);
				can.renderAll();
				
			}
		}
		PSC.onClose = function() {
			console.log(PSC.UID+" disconnected");
		}
		PSC.onQuestion = function(q,cb) {
			console.log(q);
			cb("sure");
		}
	}


}
    
