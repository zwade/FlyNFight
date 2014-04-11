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

	PSS = new PSServer();

	PSS.onConnect = function(PSC) {
		console.log(PSC.UID+" opened");
		PSC.onData = function(data) {
			console.log(PSC.UID+" received "+data);
		}
		PSC.onClose = function() {
			console.log(PSC.UID+" disconnected");
		}
	}


}
    
