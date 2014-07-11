entity = (img,can,args) ->
	this.img = img
	this.can = can
	
	this.img.set args if args?
	this.img.hasControls = false
	this.img.selectable  = false
	this.img.hasBorders  = false
	this.img.originX     = "center"
	this.img.originY     = "center"

	this.x = img.left || 0
	this.y = img.top || 0
	this.a = img.angle || 0

	#Cartesian Kinematics

	this.vx = 0
	this.vy = 0
	this.ax = 0
	this.ay = 0

	#Polar Kinematics-ish

	this.vr = 0
	this.vt = 0
	this.ar = 0
	this.at = 0

	this.cartesian = true

	this._ot = Date.now()

	this._inCan = false
	this

entity::getImage = () ->
	this.img

entity::setImage = (img) ->
	this.img = img
	
entity::addToCanvas = () ->
	if !this._inCan
		can.add this.img
		this._inCan ^= 1
		can.renderAll()
		true
	else
		false

entity::update = () ->
	nt = Date.now()
	dt = (nt-this._ot)/1000

	if this.cartesian
		this.x  += this.vx*dt
		this.vx += this.ax*dt

		this.y  += this.vy*dt
		this.vy += this.ay*dt

		this.a  = Math.atan2(this.vy,this.vx)*180/Math.PI + 90

	else
		this.a  += this.vt*dt
		this.x  += this.vr*Math.cos((this.a-90)*Math.PI/180)*dt
		this.y  += this.vr*Math.sin((this.a-90)*Math.PI/180)*dt
		
		this.vr += this.ar*dt
		this.vt += this.at*dt

	this._ot = nt

entity::render = () ->
	this.img.left = this.x
	this.img.top  = this.y

	this.img.angle = this.a

entity::set = (obj) ->
	this.img.set obj
	can.renderAll()

window?.entity = entity
