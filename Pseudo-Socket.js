PSocket = function(address) {
	var that = this
	this.UID = null;
	this.hrt = null;
	this.address = address || "ws://pilotdcrelay.herokuapp.com";
	this.ws = new WebSocket(this.address);
	this.PSC = new PSCallback(this);

	this.ws.onopen = function(data) {that.PSC.onopen(data)};
	this.ws.onmessage = function(data) {that.PSC.onmessage(data)};
	this.ws.onclose = function(data) {that.PSC.onclose(data)};

}

PSocket.prototype.startHeartbeat = function() {
	this.hrt = setInterval(this.heartbeat,20000);
}

PSocket.prototype.stopHeartbeat = function() {
	if (this.hrt) {
		clearInterval(this.hrt);
		this.hrt = null;
	}
}

PSocket.prototype.connectToHost = function() {
	
}

PSocket.prototype.heartbeat = function() {
	this.ws.send("hrt");
}


PSCallback = function(ps) {
	this.ps = ps;
}
PSCallback.prototype.onopen = function(data) {
	console.log(data);
	this.ps.startHeartbeat();
}
PSCallback.prototype.onmessage = function(data) {
	msg = data.data.split(" ");
	var cmd = msg[0];
	var data = ""
	for (var i = 1; i < msg.length-1; i++) {
		data+=msg[i]+" ";
	}
	switch(msg) {
		case "uid":
			this.ps.UID = uid;
			break;
	}

	
}
PSCallback.prototype.onclose = function(data) {
	console.log(data);
	this.ps.stopHeartbeat();
}

