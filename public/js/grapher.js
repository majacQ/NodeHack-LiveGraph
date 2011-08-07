var socket = io.connect('http://localhost:3000/data');
var graph_data = []
var result = [];
var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: 10 },
        xaxis: { show: false }
    };
var c = 0
var cValue = (Math.random() * 10) ;
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
    socket.on('send',function(data1) {
          for (i=0;i<data1.length;i++) {
            if (b[i] == undefined ) {      // if there is a new clinet, the object will be defined
              b[i] = {data:[], label:i+1}; // the object model for the data to be put in graph
              for (i2=0;i2<11;i2++) {
                b[i].data[i2] = [i2+1,0]      //adding the x axis data
              }
            }

            b[i].data[b[i].data.length] = [b[i].data.length, data1[i]]; //new points will be added to the array
            b[i].data =  b[i].data.slice(-10); // the first point will be removed
            console.log(b[i].data);
            for (i2=0;i2<9;i2++) {
              b[i].data[i2][0] -= 1
            } // x values are all one less
          }
         console.log(b);
        var plot = $.plot($('#graph'),b,options);    
        
        plot.draw();
        setTimeout(function() {
            socket.emit('received', {
            cValue:cValue,
            id:id
            });
            },1000);
    });
    
});

