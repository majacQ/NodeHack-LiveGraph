
/**
 * Module dependencies.
 */

var express = require('express'),
    app     = express.createServer(),
    io      = require('socket.io').listen(app),
    ejs     = require('ejs'),
    os      = require('os');

var prev = 0
var curr = 0
// Configuration

app.configure(function(){
  app.register('.html',require('ejs'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(app.router);
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

io.configure(function() {
    io.set('log level', 1);
});

// the value getting part
function value() {
    return Math.round(Math.random()*10) // <= this thing here can be changed to whatever u wanna put
}

// sockets

var cli3nts = []

io.of('/data').on('connection',function(socket) {
    socket.emit('hello',{ id: cli3nts.length});
    socket.on('received',function(data){
        cli3nts[data.id]= data.cValue;
        socket.emit('send',cli3nts);
       
    });
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'LiveGraph'
  });
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
