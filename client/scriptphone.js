var ws;
var env = {};
var requestReturn;

var PSC


$(window).load(function() {
	$("#wsaddr").keydown(function(e) {
		if (e.keyCode === 13) {
			connectMe();
		}
	})
	$("#wssub").click(function(e) {
		connectMe();
	})
	return
})

var connectMe = function() {
	PSC = new PSClient("ws://localhost:5000",$("#wsaddr").val()) //192.168.2.151
	PSC.onOpen = function() {
		console.log("open");
		$("#input").css("display","none");
		PSC.send("mov 100 7*Math.pi/4");
	}
	PSC.onClose = function() {
		$("#input").css("display","none");
	}
}
