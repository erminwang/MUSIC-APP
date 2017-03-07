var fs = require('fs');
var models = require('./models');
var Promise = require('bluebird');

models.sequelize.sync({force: true}).then(function() {
    //var plus=0;
    fs.readFile('./songs.json', function(err, data) {
        var music_data = JSON.parse(data);
        var songs = music_data['songs'];

        songs.forEach(function(song) {
            //console.log(song);
            models.Song.create({
                title: song.title,
                album: song.album,
                artist: song.artist,
                duration: song.duration,
            }).then(function(songb){
              songb.decrement('id');
            });
        });
    });

    fs.readFile('./playlists.json', function(err, data) {
        var playl_data = JSON.parse(data);
        var playlists = playl_data['playlists'];
        var len = playlists.length;
        playlists.forEach(function(playlist) {
            var songsInPlay = playlist.songs;
            models.Playlist.create({
                name: playlist.name,
            }).then(function(play){

              for(var i=0; i < songsInPlay.length; i++) {
                play.addSong(songsInPlay[i]);
              }
            });
        });
    });

});
