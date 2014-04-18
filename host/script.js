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
			console.log(PSC.UID+" received "+data);
			var msg = data.split(" ");
			if (msg[0] == 'mov') {
				env.players[0].animate('left', '+=msg[1]*Math.cos(msg[2])' , {
					duration:100, //100 ms
					onChange: can.renderAll.bind(can), 
				}
				env.players[0].animate('top', '+=msg[1]*Math.sin(msg[2])' , {
					duration:100,
					onChange: can.renderAll.bind(can),
				}
				//env.players[0].left+=msg[1]*Math.cos(msg[2]);
				//env.players[0].top+=msg[1]*Math.sin(msg[2]);
				//can.renderAll();
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
    
