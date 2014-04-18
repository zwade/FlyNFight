var max;
Joystick = function(r) {
	this.r = r;
	var tha = this;
	tmp = tha
	console.log(tha)
	$(document).mousedown(function(e) {
		console.log(e);
		console.log(tha)
		tha.create(e.clientX,e.clientY);
	})
}

Joystick.prototype.create = function(x,y) {
	var r = this.r || 50;
	this.base = $("<div id='joy-base' style='position:absolute; background-color: #bbb; top:"+(y-r)+"px; left:"+(x-r)+"px; width:"+r+"px; height:"+r+"px; border:"+r/2+"px solid #bbb; border-radius:"+r+"px'></div>")
	this.trig = $("<div id='joy-trig' style='position:absolute; background-color: #555; top:"+(y-r/2)+"px; left:"+(x-r/2)+"px; width:"+(r/2)+"px; height:"+(r/2)+"px; border:"+(r/4)+"px solid #555; border-radius:"+(r/2)+"px'></div>")
	this.base.appendTo($(document.body));
	this.trig.appendTo($(document.body));
}

