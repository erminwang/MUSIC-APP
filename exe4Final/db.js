var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('music.db');
var fs = require('fs');


db.serialize(function () {
  db.run('CREATE TABLE songs ("id" INTEGER PRIMARY KEY, "album" VARCHAR(255), "title" VARCHAR(255), "artist" VARCHAR(255), "duration" INTEGER)');

  //db.run('CREATE TABLE songs_playlists ("id" INTEGER, FOREIGN KEY("song_id") REFERENCES songs("id"), FOREIGN KEY("playlist_id") REFERENCES playlist("id")');
  // db.run('CREATE INDEX title_index ON songs (title);')
  fs.readFile(__dirname + '/songs.json', function(err, data) {
      var song_data = JSON.parse(data);
      var songs = song_data['songs'];
      for (var i = 0; i < songs.length; i++) {
          var song = songs[i];
          // if(song.title.indexOf('"') > -1){
          //   var query = `INSERT INTO songs (id, album, title, artist, duration) VALUES (${song.id}, "${song.album}", "${'One last ""Whoo-hoo!"" for the Pullman'}", "${song.artist}", "${song.duration}")`;
          // }else {
          var query = `INSERT INTO songs (id, album, title, artist, duration) VALUES (${song.id}, "${song.album}", (?), "${song.artist}", "${song.duration}")`;
          //}
          //console.log(query);
          db.run(query, song.title);
      }

      // db.each('SELECT * FROM songs', function (err, row) {
      //   console.log(row);
      // });
      //db.close();
  });
  db.run('CREATE TABLE playlist ("id" INTEGER PRIMARY KEY, "name" VARCHAR(255))');
  fs.readFile(__dirname + '/playlists.json', function(err, chunk) {
      var play_data = JSON.parse(chunk);
      var plays = play_data['playlists'];
      for (var j = 0; j < plays.length; j++) {
          var play = plays[j];
          var query = `INSERT INTO playlist (id, name) VALUES (${play.id}, "${play.name}")`;
          //console.log(query);
          db.run(query);
      }

      // db.each('SELECT * FROM playlist', function (err, row) {
      //   console.log(row);
      // });
      //db.close();
  });

  db.run('CREATE TABLE songs_playlists ("id" INTEGER PRIMARY KEY, "playlist_id" INTEGER, "song_id" INTEGER, FOREIGN KEY(playlist_id) REFERENCES playlist(id), FOREIGN KEY(song_id) REFERENCES songs(id))');
  fs.readFile(__dirname + '/playlists.json', function(err, chunk) {
    var innerSongsString = JSON.parse(chunk);
    var playlistTot = innerSongsString['playlists'];
    for(var k=0;k < playlistTot.length; k++) {
      var innerPlaylist = playlistTot[k].id;
      for(j=0; j < playlistTot[k].songs.length; j++) {
        var innerSong = playlistTot[k].songs[j];
        var query = `INSERT INTO songs_playlists (id, playlist_id, song_id) VALUES (null, "${innerPlaylist}", "${innerSong}")`;
        console.log(query);
        db.run(query);
      }
    }
    db.each('SELECT * FROM songs_playlists', function (err, row) {
      console.log(row);
    });
  });
});
