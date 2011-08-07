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
var b = []

socket.on('connect',function(data){
    socket.on('hello',function(data){
            id = data.id
        socket.emit('received',{
            cValue:cValue,
            id:id
            });
    });
    socket.on('send',function(data1){
         // console.log(data1);
          for (i=0;i<data1.length;i++) {
            if (b[i] == undefined ) {
              b[i] = {data:[], label:i+1};
            }  
            b[i].data.push([b[i].data.length,data1[i]]);
          }
         // console.log(b);
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

