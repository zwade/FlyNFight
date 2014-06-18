console.log("running")
var can;
var env = {};
var ws;
var PSS;
var MAXSCREEN = 3;
var scr = 0;
var thresh = 5;

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
	can = new fabric.Canvas("can");
	can.setHeight(640);
	can.setWidth(860);
	
	console.log(scr);
	selectScreen(scr);
	console.log("initing");
	init();

})

refreshList = function() {
	if (scr != 1) {
		return;
	}	
	var shouldStart = true
	var keys = Object.keys(PSS.clients);
	if (keys.length == 0) {
		scr = 0; 
		selectScreen(scr);
		return;
	}
	for (i = 0; i < 4; i++) {
		if (i < keys.length) {
			var PSC = PSS.clients[keys[i]];
			$("#join-"+i).addClass("active");
			$("#join-"+i).html(keys[i]+"<br>Ship: "+PSC.ship+"<br>Name: "+PSC.name)
			if (!PSC.start) {
				shouldStart = false;
			}
		} else {
			$("#join-"+i).removeClass("active");
			$("#join-"+i).html(""); 
		}
	}
	if (shouldStart ) { 
		scr = 2;
		selectScreen(scr);
		PSS.broadcast("startGame");
	}
}

init = function() {
	env.players = [];
	env.players[0] = new fabric.Circle({radius:40, fill: "#f00", selectable: false})
	env.players[0].hasControls = false;
	can.add(env.players[0]);
	fabric.Image.fromURL("public/ship.png", function(img) {
		env.ship = new entity(img,can); 
		env.ship.addToCanvas()
		env.ship.cartesian = false;
	})
	can.renderAll();
	setInterval(function() {
		if (!env.ship) {
			return
		}
		env.ship.update()
		env.ship.render()
		can.renderAll()
	},10)


	PSS = new PSServer("ws://pilotdcrelay.herokuapp.com");

	PSS.onName = function(name) {
		$("#uid").text(name);
	}

	PSS.onConnect = function(PSC) {
		if (scr == 0) {
			scr = 1;
			selectScreen(scr);
		}
		console.log(PSC.UID+" opened");
		
		PSC.ship = null;
		PSC.name = null;
		PSC.start = false;

		PSC.send("dataSelect");
		PSC.onData = function(data) {
			var obj = parseKVP(data);
			
			if (obj.ship) { 
				PSC.ship = obj.ship;
			}

			if (obj.name) {
				PSC.name = obj.name;
			}

			if (obj.start) {
				if (obj.start == "true") {
					PSC.start = true;
				}
			}

			if (obj.ang) {
				if (env.ship) {
					//env.ship.a = obj.ang*180/Math.PI+90;
					var a1 = env.ship.a;
					var a2 = obj.ang*180/Math.PI+90;

					while (a1 < 0) {
						a1+=360;
					}
					while (a2 < 0) {
						a2+=360;
					}
					while (a2 < a1) {
						a2 += 360;
					}
					while (a2 - a1 > 360) {
						a2 -= 360;
					}

					if (a2-a1 > 180) {
						env.ship.vt = -80
					} else {
						env.ship.vt = 80;
					}

					if (Math.abs(a2-a1) < thresh) {
						env.ship.vt = 0;
					}

					console.log(a1)
					console.log(a2)
					console.log(a2-a1);
					console.log("---------")
				}
			}
			
			if (obj.pow) {
				if (env.ship) {
					env.ship.vr = 150*obj.pow;
				}
			}
			/**
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
				
			}**/

			refreshList();

		}
		PSC.onClose = function() {
			console.log(PSC.UID+" disconnected");
			refreshList();
		}
		PSC.onQuestion = function(q,cb) {
			console.log(q);
			cb("sure");
		}
		console.log(PSS.clients);
		console.log(Object.keys(PSS.clients));
		refreshList();
	}


}
  
var parseKVP = function(data) {
	var ret = {};
	var spl = data.split(";");
	for (var i in spl) {
		var kvp = spl[i].split("=");
		ret[kvp[0]] = kvp[1];
	}
	return ret;
}
