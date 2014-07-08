console.log("running")
var can;
var env = {};
var ws;
var PSS;
var MAXSCREEN = 3;
var scr = 0;
var thresh = 10;
var TURNCAP = 180; //arbitrary
var VELCAP = 200; //arbitrary
var turnaccel = 120;

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
	env.players = {};
	env.ships = {};
	//env.players[0] = new fabric.Circle({radius:40, fill: "#f00", selectable: false})
	//env.players[0].hasControls = false;
	//can.add(env.players[0]);
	//fabric.Image.fromURL("public/ship.png", function(img) {
	//	env.ship = new entity(img,can); 
	//	env.ship.addToCanvas()
	//	env.ship.cartesian = false;
	//})
	can.renderAll();
	setInterval(function() {
		if (Object.keys(env.ships).length === 0) {
			//console.log("pls")
			return;
		}
		for(i in env.ships)
		{
			env.ships[i].update();
			env.ships[i].render();
		}
		can.renderAll();
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
		
		env.players[PSC.UID]=null; //not sure if needs to be 2 lines...
		fabric.Image.fromURL("public/ship.png", function(img) {
			env.ships[PSC.UID] = new entity(img,can); 
			console.log(env.ships[PSC.UID], PSC.UID, "_------------");
			env.ships[PSC.UID].addToCanvas()
			env.ships[PSC.UID].cartesian = false;
		})
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
					PSC.start = true; //this needs to be changed so it only starts if all obj.start (how do...)
				}
			}

			if (obj.ang) {
				if (env.ships[PSC.UID]) {
					//env.ship.a = obj.ang*180/Math.PI+90;
					var a1 = env.ships[PSC.UID].a;
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
					/*
					if (Math.abs(a2-a1) < thresh) {
						env.ship.vt = 0;
					}
					else if (Math.abs(a2-a1) < thresh*2 ) {
						env.ship.vt/=2;
					}
					*/
					if (a2-a1 > 180) {
						/*if (Math.abs(a2-a1) < thresh) {
							env.ship.at = env.ship.vt*env.ship.vt/(2*Math.abs(a2-a1))
						}*/
						if ( Math.abs(a2-a1) < thresh ) {
							env.ships[PSC.UID].vt = 0;
							env.ships[PSC.UID].at = 0;
						}
						else if ( Math.abs(a2-a1) < thresh*4 ) {
							//env.ship.vt /= 2;
							if(env.ships[PSC.UID].vt!=0) {
								env.ships[PSC.UID].at = -(env.ships[PSC.UID].vt/Math.abs(env.ships[PSC.UID].vt))*env.ships[PSC.UID].vt*env.ships[PSC.UID].vt/(2*Math.abs(a2-a1))
							}
						} 
						else {
							env.ships[PSC.UID].at = -turnaccel;
						}
					} else {
						/*if (Math.abs(a2-a1) < thresh) {
							env.ship.at = -env.ship.vt*env.ship.vt/(2*Math.abs(a2-a1))
						}*/
						if ( Math.abs(a2-a1) < thresh ) {
							env.ships[PSC.UID].vt = 0;
							env.ships[PSC.UID].at = 0;
						}
						else if ( Math.abs(a2-a1) < thresh*4 ) {
							//env.ship.vt /= 2;
							if(env.ships[PSC.UID].vt!=0) {
								env.ships[PSC.UID].at = -(env.ships[PSC.UID].vt/Math.abs(env.ships[PSC.UID].vt))*env.ships[PSC.UID].vt*env.ships[PSC.UID].vt/(2*Math.abs(a2-a1))
							}
						}						
						else {
							env.ships[PSC.UID].at = turnaccel;
						}
					}
					if(env.ships[PSC.UID].vt>TURNCAP) {
						env.ships[PSC.UID].vt=TURNCAP;
					}
					else if(env.ships[PSC.UID].vt<-TURNCAP){
						env.ships[PSC.UID].vt=-TURNCAP;
					}
					//console.log("a1, a2, vt, at", a1, a2, env.ships[PSC.UID].vt, env.ships[PSC.UID].at);

				}
			}
			var ar=0;
			if (obj.pow) {
				if (env.ships[PSC.UID]) {
					var target = 150*obj.pow;            //well this code is pretty cruddy. but hey, it gives a small sense of acceleration, 
					if (env.ships[PSC.UID].vr-target > target/2) { //which is all its really meant to do
						var j = -(target/5);         //so call it a win? 
					}
					else {
						var j = (target/10);
					}
					ar+=j;
					//console.log("j ar target vr", j, ar, target, env.ships[PSC.UID].vr);
					env.ships[PSC.UID].vr += ar;
					if(target<=5) {                      //pls
						env.ships[PSC.UID].vr=0;
					}
					else if (env.ships[PSC.UID].vr>VELCAP) {
						env.ships[PSC.UID].vr=VELCAP;
					}
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
