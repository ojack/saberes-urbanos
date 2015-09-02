require("babel/register");
var express = require('express');
var path = require('path');
var logger = require('morgan');
var api = require('./routes/api.js'); //express router for handling api requests
var bodyParser = require('body-parser');
var swig  = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./app/routes');
var mongoose = require('mongoose');
var async = require('async');
var config = require('./config');
var AWS = require('aws-sdk'); 

// var s3 = new AWS.S3(); 

//  //.createBucket({Bucket: 'myBucket456734563456'}, function(err, data) {
//  // console.log(err);
//   var params = {Bucket: 'observatorio-urbano', Key: 'you', Body: 'Hello!'};

//   s3.putObject(params, function(err, data) {

//       if (err)       

//           console.log(err)     

//       else       console.log("Successfully uploaded data to myBucket/myKey");   

//    });

// //});

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Express handler for responding to API calls
app.use('/api', api);
//app.use(busboy());
/**
 * POST /api/sitio
 * Adds new sitio to the database.
 */
 

//React Routing for client side rendering, Isomorphic
app.use(function(req, res) {
  Router.run(routes, req.path, function(Handler) {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile('views/index.html', { html: html });
    res.send(page);
  });
});

//Socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});