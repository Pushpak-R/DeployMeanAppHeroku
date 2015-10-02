/*var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});*/

var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000


// Mongoose Schema definition
   /* Schema = new mongoose.Schema({
      id       : String, 
      title    : String,
      completed: Boolean
    }),

    ticketlogs = mongoose.model('TicketLogs', Schema);*/

/*
 * I’m sharing my credential here.
 * Feel free to use it while you’re learning.
 * After that, create and use your own credential.
 * Thanks.
 *
 * MONGOLAB_URI=mongodb://example:example@ds053312.mongolab.com:53312/todolist
 * 'mongodb://example:example@ds053312.mongolab.com:53312/todolist'
 */
/*mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies*/



app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})

/*app.get('/ticketlogs', function (req, res) {
  console.log('I received a GET request');

  ticketlogs.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});*/


/*app.post('/ticketlogs', function (req, res) {
  console.log(req.body);
  db.ticketlogs.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/ticketlogs/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.ticketlogs.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/ticketlogs/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.ticketlogs.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/ticketlogs/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.ticketlogs.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {c_info: req.body.c_info, comments: req.body.comments, createdBy: req.body.createdBy, assignedTo: req.body.assignedTo, status: req.body.status}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});