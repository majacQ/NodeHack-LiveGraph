var socket = io.connect('http://localhost:3000/data');
var graph_data = []
var result = [];
var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: 10 },
        xaxis: { show: false }
    };
var c = 0
var cValue = Math.random();
var id

socket.on('connect',function(data){
    socket.on('hello',function(data){
            id = data.id
        socket.emit('received',{
            cValue:cValue,
            id:id
            });
    });
    socket.on('send',function(data1){
        if (c==0){
          b = []
          for (i=0;i<data1.length;i++) {
            b[i] = {data:[], label:i};
            b[i].data.push([b[i].data.length,data1[i]]);
            c++
          }
        } else { 
          for (i=0;i<data1.length;i++) {
            b[i].data.push([b[i].data.length, data1[i]]);
          }
        }

        var plot = $.plot($('#graph'),b,options);    
        
        plot.draw();
        setTimeout(function() {
            socket.emit('received', {
            cValue:cValue,
            id:id
            });
            },100);
    });
    
});

