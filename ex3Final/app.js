// Import the http library
var http = require('http');
var fs = require('fs');
var playlistsTotal = require('./playlists.json');
var songsTotal = require('./songs.json');

// function alertContents() {
//   if (httpRequest.readyState === XMLHttpRequest.DONE) {
//     if (httpRequest.status === 200) {
//       var response = JSON.parse(httpRequest.responseText);
//       alert(response.computedString);
//     } else {
//       alert('There was a problem with the request.');
//     }
//   }
// }
//
// var httpRequest = new XMLHttpRequest();
// if (!httpRequest) {
//       alert('Giving up :( Cannot create an XMLHTTP instance');
//       return false;
// }


// Create a server and provide it a callback to be executed for every HTTP request
// coming into localhost:3000.
var server = http.createServer(function(req, res){
  if((req.url === '/playlists' || req.url === '/library' || req.url === '/search') && req.method === 'GET'){
    res.writeHead(200, {'Text-Content' : 'text/html', cache : 1800});

    fs.readFile(__dirname + '/playlist.html', 'utf8', function(err, data){
      if(err){
        console.log('Error: ' + err);
      }else {
        res.end(data);
      }
    });
  } else if(req.url === '/api/songs'){
    res.writeHead(200, {'Text-Content' : 'application/json'});
    fs.readFile(__dirname + '/songs.json', 'utf8', function(err,data) {
      if(err){
        console.log('Error on /api/songs: ' + err);
      }else {
        res.end(data);
      }
    });

  }else if(req.url === '/api/playlists' && req.method === 'GET'){
    res.writeHead(200, {'Text-Content' : 'application/json'});
    fs.readFile(__dirname + '/playlists.json', 'utf8', function(err,data) {
      if(err){
        console.log('Error on /api/playlists: ' + err);
      }else {
        res.end(data);
      }
    });

  }else if(req.url === '/api/playlists' && req.method === 'POST'){
    res.statusCode = 200;
    //res.writeHead(200, {'Text-Content' : 'application/json'});
    var body = '';
    req.on('data', function(data) {
      body += data;
      fs.writeFile(__dirname + '/playlists.json', body, 'utf8', function(err){
        if(err){
          console.log('Error when posting playlists: ' + err);
        } else {
          console.log('posting to playlists.json sucessful');
        }
      });
    });
    req.on('error', function(err){
        res.writeHead(400);
        res.end('400 Bad Client Request!');
    });

    req.on('end', function() {
      console.log('end posting to playlists.json');
      res.writeHead(200,{"Content-Type": "application/json"});
      res.end();
    })

  }else if(req.url === '/style.css') {
    res.writeHead(200, {'Text-Content' : 'text/css', cache : 1800});
    fs.readFile(__dirname + '/style.css', 'utf8', function(err,data) {
      if(err){
        console.log('Error: ' + err);
      }else {
        res.end(data);
      }
    });
  } else if(req.url === '/music-app.js'){
    res.writeHead(200, {'Text-Content' : 'text/javascript', cache : 1800});
    fs.readFile(__dirname + '/music-app.js', 'utf8', function(err,data) {
      if(err){
        console.log('Error: ' + err);
      }else {
        res.end(data);
      }
    });

  }else if(req.url === '/') {
    res.writeHead(301, {'Location' : '/playlists'});
    res.end();
  }
  else {
    res.writeHead(404);
    res.end('404 Page Not Found');
  }
});

// Start the server on port 3000
server.listen(3000, function() {
    console.log('Amazing music app server listening on port 3000!');
});
