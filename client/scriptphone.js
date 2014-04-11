var ws;
var env = {};
var requestReturn;


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
	ws = new WebSocket("ws://localhost:5000")
	ws.onopen = function() {
		ws.send("tel svr phone");
	}
	ws.onmessage = function(msg) {
		if (requestReturn) {
			requestReturn(msg)
			requestReturn = null;
			return
		}
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
})

var connectMe = function() {
}
