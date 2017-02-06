

var i, j, k;

//general
var library = document.getElementById("library");
var playlist = document.getElementById("playlist");
var search = document.getElementById("search");
var libraryBody = document.getElementById("library-body");
var playlistBody = document.getElementById("playlist-body");
var searchBody = document.getElementById("search-body");
var libraryG = document.getElementById("libraryG");
var playlistG = document.getElementById("playlistG");
var searchG = document.getElementById("searchG");
var libraryText = document.getElementById("libraryText");
var playlistText = document.getElementById("playlistText");
var searchText = document.getElementById("searchText");
var inside = document.getElementById("inside");
var insideS = document.getElementById("inside-s");
var searchResult = document.getElementById("search-result");
var searchBox = document.getElementById("search-box");
var songsOf = document.getElementById("songs-of");
var songInPlaylist = document.getElementById("songs-in-playlist");
var songInPlaylistS = document.getElementById("songs-in-playlist-s");
var playlistInPage = document.getElementById("playlists-in-page");
var sbya = document.getElementById("sbya");
var sbyt = document.getElementById("sbyt");
document.getElementById("sbya").onclick=function(){librarySwitch('artist')};
document.getElementById("sbyt").onclick=function(){librarySwitch('title')};
//document.getElementById("close_modal").onclick = function(){closeModal()};
//document.getElementById("open").onclick = function(){openModal()};

sbya.addEventListener("click", function() {
      sbya.style.background="gold";
      sbyt.style.background="purple";
});

sbyt.addEventListener("click", function() {
      sbya.style.background="purple";
      sbyt.style.background="gold";
});

for(k = 0; k < window.MUSIC_DATA.playlists.length; k++) {
  playlistInPage.innerHTML += '<div id="y' + window.MUSIC_DATA.playlists[k].id + '" class="ppres"><div class="rectangle"></div><h4>' + window.MUSIC_DATA.playlists[k].name + '</h4><span class="glyphicon glyphicon-chevron-right"></span></div>';
}
for(k = 0; k < window.MUSIC_DATA.songs.length; k++) {
  songsOf.innerHTML += '<div id="g' + window.MUSIC_DATA.songs[k].id + '" class="ssres"><div class="rectangle col-xs-2 col-md-2"></div><h4 class="col-xs-8 col-md-8">' + window.MUSIC_DATA.songs[k].title + '</h4><span class="glyphicon glyphicon-plus-sign col-xs-1 col-md-1"></span><span class="glyphicon glyphicon-play col-xs-1 col-md-1"></span><h6 class="col-xs-6 col-md-6">' + window.MUSIC_DATA.songs[k].album + '</h6></div>';
}

document.getElementById("y0").addEventListener("click", function() {
  getInsideS("y0");
});

document.getElementById("y1").addEventListener("click", function() {
  getInsideS("y1");
});

document.getElementById("y2").addEventListener("click", function() {
  getInsideS("y2");
});



var allSearchPlaylist = document.getElementsByClassName("ppres");
//var allSearchPlaylistChildren = allSearchPlaylist.childNodes;
var allSearchSong = document.getElementsByClassName("ssres");
//var allSearchSongChildren = allSearchSong.childNodes;


library.addEventListener("click", function() {
  //console.log("library called");
  libraryBody.style.display="block";
  playlistBody.style.display="none";
  searchBody.style.display="none";
  inside.style.display="none";
  insideS.style.display="none";
  //searchResult.style.display="none";
  libraryG.style.color="purple";
  playlistG.style.color="black";
  searchG.style.color="black";
  libraryText.style.color="purple";
  playlistText.style.color="gray";
  searchText.style.color="gray";
  document.getElementById("sbya").click();
});
playlist.addEventListener("click", function() {
  playlistBody.style.display="block";
  libraryBody.style.display="none";
  searchBody.style.display="none";
  inside.style.display="none";
  insideS.style.display="none";
  //searchResult.style.display="none";
  libraryG.style.color="black";
  playlistG.style.color="purple";
  searchG.style.color="black";
  libraryText.style.color="gray";
  playlistText.style.color="purple";
  searchText.style.color="gray";
});
search.addEventListener("click", function() {
  searchBody.style.display="block";
  playlistBody.style.display="none";
  libraryBody.style.display="none";
  inside.style.display="none";
  insideS.style.display="none";
  //searchResult.style.display="block";
  libraryG.style.color="black";
  playlistG.style.color="black";
  searchG.style.color="purple";
  libraryText.style.color="gray";
  playlistText.style.color="gray";
  searchText.style.color="purple";
  //searchBox.value = "";
});

//determine whether an element is in array
var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};



//Library
/*
var songs = document.getElementById("songs");
for(j = 0; j < window.MUSIC_DATA.songs.length; j++){
  songs.innerHTML += '<div id="s' + window.MUSIC_DATA.songs[j].id + '" class="sres"><div class="rectangle col-xs-2 col-md-2"></div><h4 class="col-xs-8 col-md-8">' + window.MUSIC_DATA.songs[j].title + '</h4><span class="glyphicon glyphicon-plus-sign col-xs-1 col-md-1"></span><span class="glyphicon glyphicon-play col-xs-1 col-md-1"></span><h6 class="col-xs-6 col-md-6">' + window.MUSIC_DATA.songs[j].album + '</h6></div><hr>';
}*/

var overlay = document.getElementById('overlay');


function closeModal(){
     overlay.style.display = "none";
}
function openModal(){
     overlay.style.display = "block";
}

addSong = document.getElementsByClassName("glyphicon-plus-sign");
for(i=0; i < addSong.length; i++) {
  addSong[i].addEventListener("click", function() {
    console.log("clickme");
  });
}

//library page
function sortBy(filed, rev, primer) {
    rev = (rev) ? -1 : 1;
    return function (a, b) {
        a = a[filed];
        b = b[filed];
        if (typeof (primer) != 'undefined') {
            a = primer(a);
            b = primer(b);
        }
        if (a < b) { return rev * -1; }
        if (a > b) { return rev * 1; }
        return 1;
    }
}

//sort switch
function librarySwitch(sortName) {
    if(sortName === 'artist'){

      sortSelector('artist');

    }
    else{
      sortSelector('title');

    }
}

//default sort
document.getElementById("sbya").click();

//sorting algorithm
function sortSelector(sortName) {
  var sortVar;
  if(sortName === 'artist'){
        var insertIdtemp = document.getElementById("songs");
        if(insertIdtemp.childNodes.length){
            for(var j=insertIdtemp.childNodes.length-1; j>=0; j--){
                //insertIdtemp.removeChild(insertId.childNodes[j]);
                insertIdtemp.childNodes[j].innerHTML="";
            }
        //restore orginal music-data order by id
        window.MUSIC_DATA.songs.sort(sortBy('id', false, parseInt));
        }
    var pattern = new RegExp("^The ")
    for(var i=0;i<window.MUSIC_DATA.songs.length;i++){
      if(pattern.test(window.MUSIC_DATA.songs[i].artist)){
        window.MUSIC_DATA.songs[i].sortartist = window.MUSIC_DATA.songs[i].artist.substr(4,window.MUSIC_DATA.songs[i].artist.length);
      }
      else{
        window.MUSIC_DATA.songs[i].sortartist = window.MUSIC_DATA.songs[i].artist;
      }
    }
    sortVar = 'sortartist';
        window.MUSIC_DATA.songs.sort(sortBy(sortVar, false, String));
        for(var i=0;i<window.MUSIC_DATA.songs.length;i++){
            var newLi = document.createElement("div");
            newLi.innerHTML = '<div id="s' + window.MUSIC_DATA.songs[i].id + '" class="sres"><div class="rectangle col-xs-2 col-md-2"></div><h4 class="col-xs-8 col-md-8">' + window.MUSIC_DATA.songs[i].title + '</h4><span class="glyphicon glyphicon-plus-sign col-xs-1 col-md-1"></span><span class="glyphicon glyphicon-play col-xs-1 col-md-1"></span><h6 class="col-xs-6 col-md-6">' + window.MUSIC_DATA.songs[i].artist + '</h6></div><hr>';
            //newLi.textContent = window.MUSIC_DATA.playlists[i].name;
            var insertId = document.getElementById("songs");
            insertId.appendChild(newLi);
        }
  }
  else{
        var insertIdtemp = document.getElementById("songs");
        if(insertIdtemp.childNodes.length){
            for(var j=insertIdtemp.childNodes.length-1; j>=0; j--){
                //insertIdtemp.removeChild(insertId.childNodes[j]);
                insertIdtemp.childNodes[j].innerHTML="";
            }
        //restore orginal music-data order by id
        window.MUSIC_DATA.songs.sort(sortBy('id', false, parseInt));
        }
    var pattern = new RegExp("^The ")
    for(var i=0;i<window.MUSIC_DATA.songs.length;i++){
      if(pattern.test(window.MUSIC_DATA.songs[i].title)){
        window.MUSIC_DATA.songs[i].sorttitle = window.MUSIC_DATA.songs[i].title.substr(4,window.MUSIC_DATA.songs[i].title.length);
      }
      else{
        window.MUSIC_DATA.songs[i].sorttitle = window.MUSIC_DATA.songs[i].title;
      }
    }
    sortVar = 'sorttitle';
        window.MUSIC_DATA.songs.sort(sortBy(sortVar, false, String));
        for(var i=0;i<window.MUSIC_DATA.songs.length;i++){
            var newLi = document.createElement("div");
            newLi.innerHTML = '<div id="s' + window.MUSIC_DATA.songs[i].id + '" class="sres"><div class="rectangle col-xs-2 col-md-2"></div><h4 class="col-xs-8 col-md-8">' + window.MUSIC_DATA.songs[i].title + '</h4><span class="glyphicon glyphicon-plus-sign col-xs-1 col-md-1"></span><span class="glyphicon glyphicon-play col-xs-1 col-md-1"></span><h6 class="col-xs-6 col-md-6">' + window.MUSIC_DATA.songs[i].artist + '</h6></div><hr>';
            //newLi.textContent = window.MUSIC_DATA.playlists[i].name;
            var insertId = document.getElementById("songs");
            insertId.appendChild(newLi);
        }
  }
}
/*
function getInside(songId) {
  var theSong = getElementById(songID);
  var parentId = theSong.parentNode.id;
  if(parentId.charAt(0) == "s") {
    if()
  }
}
var pluses = getElementByClassName("glyphicon-plus-sign");
for(var i =0; i < pluses.length; i++) {
  pluses[i].addEventListener("click", function(pluses[i].id);

  }
}
*/

//playlist
var hOne = document.getElementById("h-one");
var hOneS = document.getElementById("h-one-s");


var playlists = document.getElementById("playlists");
for(k = 0; k < window.MUSIC_DATA.playlists.length; k++) {
  playlists.innerHTML += '<div id="p' + window.MUSIC_DATA.playlists[k].id + '" class="pres"><div class="rectangle"></div><h4>' + window.MUSIC_DATA.playlists[k].name + '</h4><span class="glyphicon glyphicon-chevron-right"></span></div><hr>';
}

document.getElementById("p0").addEventListener("click", function() {
  getInside("p0");
});

document.getElementById("p1").addEventListener("click", function() {
  getInside("p1");
});

document.getElementById("p2").addEventListener("click", function() {
  getInside("p2");
});

function getInside(playlistId) {
  libraryBody.style.display="none";
  playlistBody.style.display="none";
  searchBody.style.display="none";
  inside.style.display="block";
  console.log("post " + playlistId);
  var thePlaylist = document.getElementById(playlistId);
  for(j = 0; j < window.MUSIC_DATA.playlists.length; j++){
    if(playlistId.charAt(0) == "p" && Number(playlistId.charAt(1)) == window.MUSIC_DATA.playlists[j].id ) {
      //console.log(playlistId.charAt(1));
      //console.log(window.MUSIC_DATA.playlists[j].id);
      for(k=0; k < window.MUSIC_DATA.songs.length; k++) {
        if((window.MUSIC_DATA.playlists[j].songs).includes(window.MUSIC_DATA.songs[k].id)){
          hOne.innerHTML = window.MUSIC_DATA.playlists[j].name;
          songInPlaylist.innerHTML += '<div id="g' + window.MUSIC_DATA.songs[k].id + '" class="sres"><div class="rectangle col-xs-2 col-md-2"></div><h4 class="col-xs-8 col-md-8">' + window.MUSIC_DATA.songs[k].title + '</h4><span class="glyphicon glyphicon-plus-sign col-xs-1 col-md-1"></span><span class="glyphicon glyphicon-play col-xs-1 col-md-1"></span><h6 class="col-xs-6 col-md-6">' + MUSIC_DATA.playlists[j].name + '</h6></div><hr>';
        }
      }

    }
  }
}
var allPlaylist = document.getElementsByClassName("pres");
console.log(allPlaylist.length);
for(var i =0; i < allPlaylist.length; i++) {
    //var playlistId = allPlaylist[i].getAttribute("id");
    //console.log("pre" + playlistId);
    // allPlaylist[i].addEventListener("click", function() {
    //   getInside(playlistId);
    // });
    //clickEvent(i,playlistId);
}
/*
function clickEvent(index,playlistId) {
  allPlaylist[index].addEventListener("click", function() {
      getInside(playlistId);
  });
}
*/

//search

function getInsideS(playlistId) {
  libraryBody.style.display="none";
  playlistBody.style.display="none";
  searchBody.style.display="none";
  inside.style.display="none";
  insideS.style.display="block";
  libraryG.style.color="black";
  playlistG.style.color="purple";
  searchG.style.color="black";
  libraryText.style.color="gray";
  playlistText.style.color="purple";
  searchText.style.color="gray";
  console.log("second post " + playlistId);
  var thePlaylist = document.getElementById(playlistId);
  for(j = 0; j < window.MUSIC_DATA.playlists.length; j++){
    if(playlistId.charAt(0) == "y" && Number(playlistId.charAt(1)) === window.MUSIC_DATA.playlists[j].id ) {
      console.log(playlistId.charAt(1));
      //console.log(window.MUSIC_DATA.playlists[j].id);
      for(k=0; k < window.MUSIC_DATA.songs.length; k++) {
        if((window.MUSIC_DATA.playlists[j].songs).includes(window.MUSIC_DATA.songs[k].id)){
          hOneS.innerHTML = window.MUSIC_DATA.playlists[j].name;
          songInPlaylistS.innerHTML += '<div id="v' + window.MUSIC_DATA.songs[k].id + '" class="sres"><div class="rectangle col-xs-2 col-md-2"></div><h4 class="col-xs-8 col-md-8">' + window.MUSIC_DATA.songs[k].title + '</h4><span class="glyphicon glyphicon-plus-sign col-xs-1 col-md-1"></span><span class="glyphicon glyphicon-play col-xs-1 col-md-1"></span><h6 class="col-xs-6 col-md-6">' + window.MUSIC_DATA.songs[k].album + '</h6></div><hr>';
        }
      }

    }
  }
}
/*
function clickEventS(index,playlistId) {
  document.getElementById(playlistId).addEventListener("click", function() {
      console.log("times in clickEventS");
      getInsideS(playlistId);
  });
}
*/

function searchComplete() {
  console.log("searhComplete is running");
  for(i = 0; i < allSearchSong.length; i++) {
    allSearchSong[i].style.display="none";
  }
  for(j = 0; j < allSearchPlaylist.length; j++) {
    allSearchPlaylist[j].style.display="none";
  }

  var inp = searchBox.value;
  console.log(inp !== "");

  //console.log(allSearchPlaylist[1].childNodes[1].textContent);
  for(j = 0; j < allSearchPlaylist.length; j++) {
    //console.log(inp);
    if((inp !== "") && (allSearchPlaylist[j].childNodes[1].textContent.indexOf(inp) >= 0)){
      console.log("how many times");
      //playlistInPage.innerHTML += '<div id="z' + window.MUSIC_DATA.playlists[j].id + '" class="pres"><div class="rectangle"></div><h4>' + window.MUSIC_DATA.playlists[j].name + '</h4><span class="glyphicon glyphicon-chevron-right"></span></div><hr>';
      allSearchPlaylist[j].style.display="block";

      //var q = allSearchPlaylist[j].getAttribute("id");
      //console.log("q is " + q);
      //clickEventS(j, q);
      console.log("after event");
      console.log("get search playlist " + j);
    }
  }
  for(i = 0; i < allSearchSong.length; i++) {

    if((inp !== "") && (allSearchSong[i].childNodes[1].textContent.indexOf(inp) >= 0 || window.MUSIC_DATA.songs[i].artist.indexOf(inp) >= 0)) {

      //songInPlaylist.innerHTML += '<div id="y' + window.MUSIC_DATA.songs[i].id + '" class="pres"><div class="rectangle"></div><h4>' + window.MUSIC_DATA.songs[i].title + '</h4><span class="glyphicon glyphicon-chevron-right"></span></div><hr>';
      allSearchSong[i].style.display="block";
      console.log("get search songs " + i);

    }
  }
}

searchBox.addEventListener("keyup", searchComplete);
