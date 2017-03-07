// Import the http library
var http = require('http');
var fs = require('fs');
var path = require('path');
var models = require('./models');
//var songFile = "music.db";
//var exists = fs.existsSync(file);
//var playFile = "playlist.db";
var playlistsTotal = require('./playlists.json');
var songsTotal = require('./songs.json');
var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require("sequelize");
//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('music.db');

//create express server
var app = express();
app.use(bodyParser.json());   //support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


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


models.sequelize.sync().then(function(){
  app.get('/api/playlists', function(req, res) {
    res.set({
      statusCode : 200,
      'Content-Type' : 'application/json'
    });
    models.Playlist.findAll().then(function(playlists){
      var len = playlists.length;
      var playObject = {
        "playlists":[]
      };
      var i=0;
      var counter = 0;

      playlists.forEach(function(playlist){
        i++;

        var objp={
            "id" : playlist.id-1,
            "name" : playlist.name,
            "songs" : []
        };
        playObject.playlists.push(objp);
        console.log(objp);
        playlist.getSongs().then(function(songsData){
          counter++;
          console.log(counter);
          console.log("the length of is " + songsData.length);
          for(var j =0; j < songsData.length; j++){
            var songId = songsData[j].id;
            var correspondingPlay = songsData[j].SongPlaylist.playlist_id-1;
            console.log("corress " + correspondingPlay);
            playObject.playlists[correspondingPlay].songs.push(songId);
          }
          if(counter===len){
              res.send(JSON.stringify(playObject, null, 4));

          }
        });

       });

  });


  });

  app.get('/api/songs', function(req, res){
    res.set({
      statusCode : 200,
      'Content-Type' : 'application/json'
    });
    models.Song.findAll().then(function(songs){
      var AllSongObject={
        "songs":[]
      }
      var count=0;
      var Songlen=songs.length;
      songs.forEach(function(song){
        count++;
        var songObj={
          "album":song.album,
          "duration":song.duration,
          "title":song.title,
          "id":song.id,
          "artist":song.artist
        }
        AllSongObject.songs.push(songObj);
        if(count===Songlen){
          res.send(JSON.stringify(AllSongObject, null, 4))
        }
      });

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



app.listen(3000, function() {
   console.log('Amazing music app server listening on port 3000!');
});
