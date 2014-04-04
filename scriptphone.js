var ws;

$(window).load(function() {
    $("#wssub").click(function() {
        console.log("clicked")
        ws = new WebSocket("ws://"+$("#wsaddr").val()+":8080");
        ws.onopen = function() {
            ws.send("hi?");
        }
    })
})
