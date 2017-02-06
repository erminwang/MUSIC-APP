// Import the http library
var http = require('http');
var fs = require('fs');
//var songFile = "music.db";
//var exists = fs.existsSync(file);
//var playFile = "playlist.db";
var playlistsTotal = require('./playlists.json');
var songsTotal = require('./songs.json');
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('music.db');
var mu = require('mu2');

//create express server
var app = express();
app.use(bodyParser.json());   //support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
mu.root = __dirname;


//Get style.css
app.get('/', function(req, res) {
  res.set({
    statusCode : 301,
    'Content-Type' : 'text/plain',
    cache : 1800
  });
  res.redirect('/playlists');
})

app.get('/style.css', function(req, res) {
  res.set({
    statusCode : 200,
    'Content-Type' : 'text/css',
    cache : 1800
  });
  res.sendFile(__dirname + '/public/style.css');
});

app.get('/playlists', function(req, res) {
  res.set({
    'Content-Type': 'text/html',
    statusCode : 200,
    cache : 1800
  });
  res.sendFile(__dirname + '/playlist.html');
});

app.get('/library', function(req, res) {
  res.set({
    'Content-Type': 'text/html',
    statusCode : 200,
    cache : 1800
  });
  res.sendFile(__dirname + '/playlist.html');
});

app.get('/search', function(req, res) {
  res.set({
    'Content-Type': 'text/html',
    statusCode : 200,
    cache : 1800
  });
  res.sendFile(__dirname + '/playlist.html');
});

app.get('/music-app.js', function(req, res) {
  res.set({
    'Content-Type': 'text/javascript',
    statusCode : 200,
    cache : 1800
  });
  res.sendFile(__dirname + '/public/music-app.js');
});

app.get('/tra/playlists', function(req, res) {
  res.set({
    statusCode : 200,
    'Content-Type' : 'application/json'
  });
  res.sendFile(__dirname + '/playlists.json');

});

app.get('/api/songs', function(req, res){
  res.set({
    statusCode : 200,
    'Content-Type' : 'application/json'
  });
  var songObj={
    "songs" : []
  }
  var query = "SELECT * FROM songs";
  console.log(query);
  db.serialize(function() {
    db.each(query, function(err, row) {
      console.log(row);
      songObj.songs.push({
        "album":row.album,
        "duration":row.duration,
        "title":row.title,
        "id":row.id,
        "artist":row.artist
      })
    }, function(){
      console.log(songObj);
      res.send(JSON.stringify(songObj, null, 4));
    });
  });

});

app.get('/api/playlists', function(req, res) {
  res.set({
    statusCode : 200,
    'Content-Type' : 'application/json'
  });
  var playObject = {
    "playlists":[]
  };
  //console.log(playObject.length);
  //playObject.playlists.push("a");
  var query = "SELECT * FROM playlist";
  var queryB = "SELECT * FROM songs_playlists";
    //console.log("the length is: " + playObject.playlists);
  db.serialize(function() {
    db.each(query, function(err, row) {
      if(err) throw err;
      else{
        var objp={
          "id" : row.id,
          "name" : row.name,
          "songs" : []
        };
        playObject.playlists.push(objp);
        console.log(playObject.playlists);
        // console.log(suck);
        console.log("complete");
      }
    }, function(){
      console.log("happy now");
      //res.send(JSON.stringify(playObject, null, 4));
    });

    db.each(queryB, function(err, rowB) {
      if(err) throw err;
      else{
        playObject.playlists[rowB.playlist_id].songs.push(rowB.song_id);
      }
    }, function(){
      console.log(playObject);
      res.send(JSON.stringify(playObject, null, 4));
    });

  });

});

app.get('/tra/songs', function(req, res) {
  res.set({
    statusCode : 200,
    'Content-Type' : 'application/json'
  });
  res.sendFile(__dirname + '/songs.json');
});
// // function alertContents() {
// //   if (httpRequest.readyState === XMLHttpRequest.DONE) {
// //     if (httpRequest.status === 200) {
// //       var response = JSON.parse(httpRequest.responseText);
// //       alert(response.computedString);
// //     } else {
// //       alert('There was a problem with the request.');
// //     }
// //   }
// // }
// //
// // var httpRequest = new XMLHttpRequest();
// // if (!httpRequest) {
// //       alert('Giving up :( Cannot create an XMLHTTP instance');
// //       return false;
// // }
//
//
// // Create a server and provide it a callback to be executed for every HTTP request
// // coming into localhost:3000.
// var server = http.createServer(function(req, res){
//   if((req.url === '/playlists' || req.url === '/library' || req.url === '/search') && req.method === 'GET'){
//     res.writeHead(200, {'Text-Content' : 'text/html', cache : 1800});
//
//     fs.readFile(__dirname + '/playlist.html', 'utf8', function(err, data){
//       if(err){
//         console.log('Error: ' + err);
//       }else {
//         res.end(data);
//       }
//     });
//   } else if(req.url === '/api/songs'){
//     res.writeHead(200, {'Text-Content' : 'application/json'});
//     fs.readFile(__dirname + '/songs.json', 'utf8', function(err,data) {
//       if(err){
//         console.log('Error on /api/songs: ' + err);
//       }else {
//         res.end(data);
//       }
//     });
//
//   }else if(req.url === '/api/playlists' && req.method === 'GET'){
//     res.writeHead(200, {'Text-Content' : 'application/json'});
//     fs.readFile(__dirname + '/playlists.json', 'utf8', function(err,data) {
//       if(err){
//         console.log('Error on /api/playlists: ' + err);
//       }else {
//         res.end(data);
//       }
//     });
//
//   }else if(req.url === '/api/playlists' && req.method === 'POST'){
//     res.statusCode = 200;
//     //res.writeHead(200, {'Text-Content' : 'application/json'});
//     var body = '';
//     req.on('data', function(data) {
//       body += data;
//       fs.writeFile(__dirname + '/playlists.json', body, 'utf8', function(err){
//         if(err){
//           console.log('Error when posting playlists: ' + err);
//         } else {
//           console.log('posting to playlists.json sucessful');
//         }
//       });
//     });
//     req.on('error', function(err){
//         res.writeHead(400);
//         res.end('400 Bad Client Request!');
//     });
//
//     req.on('end', function() {
//       console.log('end posting to playlists.json');
//       res.writeHead(200,{"Content-Type": "application/json"});
//       res.end();
//     })
//
//   }else if(req.url === '/style.css') {
//     res.writeHead(200, {'Text-Content' : 'text/css', cache : 1800});
//     fs.readFile(__dirname + '/style.css', 'utf8', function(err,data) {
//       if(err){
//         console.log('Error: ' + err);
//       }else {
//         res.end(data);
//       }
//     });
//   } else if(req.url === '/music-app.js'){
//     res.writeHead(200, {'Text-Content' : 'text/javascript', cache : 1800});
//     fs.readFile(__dirname + '/music-app.js', 'utf8', function(err,data) {
//       if(err){
//         console.log('Error: ' + err);
//       }else {
//         res.end(data);
//       }
//     });
//
//   }else if(req.url === '/') {
//     res.writeHead(301, {'Location' : '/playlists'});
//     res.end();
//   }
//   else {
//     res.writeHead(404);
//     res.end('404 Page Not Found');
//   }
// });
//
// // Start the server on port 3000
app.listen(3000, function() {
   console.log('Amazing music app server listening on port 3000!');
});
