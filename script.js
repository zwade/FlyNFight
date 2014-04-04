console.log("running")
var can;
var env = {};
var ws;


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
    
    ws = new WebSocket("ws://localhost:8080");
    ws.onopen = function() {
        ws.send("hello!");
    }
    ws.onmessage = function(data) {
        var cmds = data.split(" ");
        if (cmds[0] == "reg") {
            ws.send("ass uid 1");
        }
    }
}