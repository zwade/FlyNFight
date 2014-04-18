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
	PSC = new PSClient("ws://192.168.2.151",$("#wsaddr").val())
	PSC.onOpen = function() {
		console.log("open");
		$("#input").css("display","none");
	}
	PSC.onClose = function() {
		$("#input").css("display","none");
	}
}
