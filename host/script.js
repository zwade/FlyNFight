console.log("running")
var can;
var env = {};
var ws;
var PSS;
var MAXSCREEN = 3;
var screen = 0;

selectScreen = function(scr) {
	var screen = "hold-"+scr;
	for (var i = 0; i < MAXSCREEN; i++) {
		var tmpscr = "hold-"+i;
		if (tmpscr == screen) {
			$("#"+tmpscr).css("display","block");
		} else {
			$("#"+tmpscr).css("display","none");
		}
	}
}

$(window).load(function() {
	$("#can-hold").css("display","none");

	can = new fabric.Canvas("can");
	can.setHeight(640);
	can.setWidth(860);
	
	console.log("initing");
	init();

	selectScreen(screen);
})

refreshList = function() {
	for (i = 0; i < 4; i++) {
		if (i < Object.keys(PSS.clients).length) {
			$("#join-"+i).addClass("active");
			$("#join-"+i).html(Object.keys(PSS.clients)[i])
		} else {
			$("#join-"+i).removeClass("active");
			$("#join-"+i).html(""); 
		}
	}
}

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
		if (screen == 0) {
			screen = 1;
			selectScreen(screen);
		}
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
			refreshList();
		}
		PSC.onQuestion = function(q,cb) {
			console.log(q);
			cb("sure");
		}
		refreshList();
	}


}
    
