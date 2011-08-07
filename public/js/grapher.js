//variables, can be changed

var maxValue = 10;
var maxTime = 400;
var speed = 100;


var socket = io.connect('http://' + address + ':' + port + '/data');
var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: maxValue },
        xaxis: { show: false }
    };
var cValue = Math.round(Math.random() * maxValue);
var id;
var b = [];


socket.on('connect',function(data){ //connected to server
    socket.on('hello',function(data){ //server says hello, we get our id
            id = data.id
        socket.emit('received',{ //we send the id back with the value
            cValue:cValue,
            id:id
            });
    });
    socket.on('send',function(data1) { //we get the all the values in an array
          for (i=0;i<data1.length;i++) {
            if (b[i] == undefined ) {      // if there is a new clinet, the object will be defined
              b[i] = {data:[], label:i+1}; // the object model for the data to be put in graph
              for (i2=0;i2<(maxTime + 1);i2++) {
                b[i].data[i2] = [i2+1,0]      //adding the x axis data
              }
            }

            b[i].data[b[i].data.length] = [b[i].data.length, data1[i]]; //new points will be added to the array
            b[i].data =  b[i].data.slice(-maxTime); // the first point will be removed
      
      for (i2=0;i2<(maxTime - 1);i2++) {
              b[i].data[i2][0] -= 1
            } // x values are all one less
          }
        var plot = $.plot($('#graph'),b,options);    
        
        plot.draw();
        setTimeout(function() {
            socket.emit('received', {
            cValue:cValue,
            id:id
            });
            },500);
    });
    
});
