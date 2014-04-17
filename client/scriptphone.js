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
	PSC = new PSClient("ws://localhost:5000",$("#wsaddr").val())
	PSC.onOpen = function() {
		console.log("open");
	}
	

}
