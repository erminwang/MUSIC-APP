var package = {};
var playlistsObj2 = {};
var songsGet = false;
var playlistsGet = false;
document.getElementById("close_modal").onclick = function(){closeModal()};
var overlay = document.getElementById('overlay');


function closeModal(){
     overlay.style.display = "none";
}
function openModal(){
     overlay.style.display = "block";
}

var tryRunApplication = function() {
  if(songsGet == true && playlistsGet == true) {
    console.log('start displaying package');

    run();
  }
};

function makeRequest(url, callback) {
  var httpRequest = new XMLHttpRequest();
  if(!httpRequest) {
    alert('Create httpRequest failed');
    return false;
  }
  httpRequest.onreadystatechange = function() {
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      if(httpRequest.status === 200){
        var local = httpRequest.responseText;
        callback.apply(this, [local]);
      } else {
        console.log('Somethings wrong with the request');
      }
    }
  };

  httpRequest.open('GET', url);
  httpRequest.send();
}

var getSongs = function(){
  makeRequest('/api/songs', function(chunk) {
    var songsObj = JSON.parse(chunk);
    package['songs'] = songsObj['songs'];
    console.log("got songs");
    songsGet = true;
    tryRunApplication();
  });
};

makeRequest('/api/playlists', function(chunk) {
  var playlistsObj = JSON.parse(chunk);
  package['playlists'] = playlistsObj['playlists'];
  playlistsObj2['playlists'] = playlistsObj['playlists'];
  console.log(playlistsObj);
  playlistsGet = true;
  getSongs();
});



function run(){

var i, j, k;

// if (window.location.href.indexOf('/playlists') > -1) {
//     alert('heeldd');
// }



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



sbya.addEventListener("click", function() {
      sbya.style.background="gold";
      sbyt.style.background="purple";
});

sbyt.addEventListener("click", function() {
      sbya.style.background="purple";
      sbyt.style.background="gold";
});

for(k = 0; k < package.playlists.length; k++) {
  playlistInPage.innerHTML += '<div id="y' + package.playlists[k].id + '" class="ppres"><div class="rectangle"></div><h4>' + package.playlists[k].name + '</h4><span class="glyphicon glyphicon-chevron-right"></span></div>';
}
for(k = 0; k < package.songs.length; k++) {
  songsOf.innerHTML += '<div id="g' + package.songs[k].id + '" class="ssres"><div class="rectangle col-xs-2 col-md-2"></div><h4 class="col-xs-8 col-md-8">' + package.songs[k].title + '</h4><span class="glyphicon glyphicon-plus-sign col-xs-1 col-md-1" onclick="showModal(this)"></span><span class="glyphicon glyphicon-play col-xs-1 col-md-1"></span><h6 class="col-xs-6 col-md-6">' + package.songs[k].album + '</h6></div>';
}




for(let cc=0; cc < package.playlists.length; cc++) {

  $("#y" + cc).click(function(){
    getInsideS("y" + cc);
  });

}



var allSearchPlaylist = document.getElementsByClassName("ppres");

var allSearchSong = document.getElementsByClassName("ssres");


if (window.location.href.indexOf('/library') > -1) {

  libraryBody.style.display="block";
  playlistBody.style.display="none";
  searchBody.style.display="none";
  inside.style.display="none";
  insideS.style.display="none";

  libraryG.style.color="purple";
  playlistG.style.color="black";
  searchG.style.color="black";
  libraryText.style.color="purple";
  playlistText.style.color="gray";
  searchText.style.color="gray";
  document.getElementById("sbya").click();

} else if (window.location.href.indexOf('/playlist') > -1) {
  playlistBody.style.display="block";
  libraryBody.style.display="none";
  searchBody.style.display="none";
  inside.style.display="none";
  insideS.style.display="none";

  libraryG.style.color="black";
  playlistG.style.color="purple";
  searchG.style.color="black";
  libraryText.style.color="gray";
  playlistText.style.color="purple";
  searchText.style.color="gray";
} else if (window.location.href.indexOf('/search') > -1) {
  searchBody.style.display="block";
  playlistBody.style.display="none";
  libraryBody.style.display="none";
  inside.style.display="none";
  insideS.style.display="none";

  libraryG.style.color="black";
  playlistG.style.color="black";
  searchG.style.color="purple";
  libraryText.style.color="gray";
  playlistText.style.color="gray";
  searchText.style.color="purple";

}

library.addEventListener("click", function() {

  libraryBody.style.display="block";
  playlistBody.style.display="none";
  searchBody.style.display="none";
  inside.style.display="none";
  insideS.style.display="none";

  libraryG.style.color="purple";
  playlistG.style.color="black";
  searchG.style.color="black";
  libraryText.style.color="purple";
  playlistText.style.color="gray";
  searchText.style.color="gray";
  document.getElementById("sbya").click();
  window.history.pushState(null, null, '/library');
});
playlist.addEventListener("click", function() {
  playlistBody.style.display="block";
  libraryBody.style.display="none";
  searchBody.style.display="none";
  inside.style.display="none";
  insideS.style.display="none";

  libraryG.style.color="black";
  playlistG.style.color="purple";
  searchG.style.color="black";
  libraryText.style.color="gray";
  playlistText.style.color="purple";
  searchText.style.color="gray";
  window.history.pushState(null, null, '/playlists');
});
search.addEventListener("click", function() {
  searchBody.style.display="block";
  playlistBody.style.display="none";
  libraryBody.style.display="none";
  inside.style.display="none";
  insideS.style.display="none";

  libraryG.style.color="black";
  playlistG.style.color="black";
  searchG.style.color="purple";
  libraryText.style.color="gray";
  playlistText.style.color="gray";
  searchText.style.color="purple";

  window.history.pushState(null, null, '/search');
});

//Library

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
        package.songs.sort(sortBy('id', false, parseInt));
        }
    var pattern = new RegExp("^The ")
    for(var i=0;i<package.songs.length;i++){
      if(pattern.test(package.songs[i].artist)){
        package.songs[i].sortartist = package.songs[i].artist.substr(4,package.songs[i].artist.length);
      }
      else{
        package.songs[i].sortartist = package.songs[i].artist;
      }
    }
    sortVar = 'sortartist';
        package.songs.sort(sortBy(sortVar, false, String));
        for(var i=0;i<package.songs.length;i++){
            var newLi = document.createElement("div");
            newLi.innerHTML = '<div id="s' + package.songs[i].id + '" class="sres"><div class="rectangle col-xs-2 col-md-2"></div><h4 class="col-xs-8 col-md-8">' + package.songs[i].title + '</h4><span class="glyphicon glyphicon-plus-sign col-xs-1 col-md-1" onclick="showModal(this)"></span><span class="glyphicon glyphicon-play col-xs-1 col-md-1"></span><h6 class="col-xs-6 col-md-6">' + package.songs[i].artist + '</h6></div><hr>';
            //newLi.textContent = package.playlists[i].name;
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
        package.songs.sort(sortBy('id', false, parseInt));
        }
    var pattern = new RegExp("^The ")
    for(var i=0;i<package.songs.length;i++){
      if(pattern.test(package.songs[i].title)){
        package.songs[i].sorttitle = package.songs[i].title.substr(4,package.songs[i].title.length);
      }
      else{
        package.songs[i].sorttitle = package.songs[i].title;
      }
    }
    sortVar = 'sorttitle';
        package.songs.sort(sortBy(sortVar, false, String));
        for(var i=0;i<package.songs.length;i++){
            var newLi = document.createElement("div");
            newLi.innerHTML = '<div id="s' + package.songs[i].id + '" class="sres"><div class="rectangle col-xs-2 col-md-2"></div><h4 class="col-xs-8 col-md-8">' + package.songs[i].title + '</h4><span class="glyphicon glyphicon-plus-sign col-xs-1 col-md-1" onclick="showModal(this)"></span><span class="glyphicon glyphicon-play col-xs-1 col-md-1"></span><h6 class="col-xs-6 col-md-6">' + package.songs[i].artist + '</h6></div><hr>';
            //newLi.textContent = package.playlists[i].name;
            var insertId = document.getElementById("songs");
            insertId.appendChild(newLi);
        }
  }
}


//playlist
var hOne = document.getElementById("h-one");
var hOneS = document.getElementById("h-one-s");


var playlists = document.getElementById("playlists");
for(k = 0; k < package.playlists.length; k++) {
  playlists.innerHTML += '<div id="p' + package.playlists[k].id + '" class="pres"><div class="rectangle"></div><h4>' + package.playlists[k].name + '</h4><span class="glyphicon glyphicon-chevron-right"></span></div><hr>';
}


for(let bb=0; bb < package.playlists.length; bb++) {

  $("#p" + bb).click(function(){
    getInside("p" + bb);
  });

}

function getInside(playlistId) {
  songInPlaylist.innerHTML ='';
  libraryBody.style.display="none";
  playlistBody.style.display="none";
  searchBody.style.display="none";
  inside.style.display="block";
  console.log("post " + playlistId);
  var thePlaylist = document.getElementById(playlistId);
  for(j = 0; j < package.playlists.length; j++){
    if(Number(playlistId.charAt(1)) == package.playlists[j].id ) {
      console.log(playlistId.charAt(1));
      console.log(package.playlists[j].id);
      for(k=0; k < package.songs.length; k++) {
        if((package.playlists[j].songs).includes(package.songs[k].id)){
          hOne.innerHTML = package.playlists[j].name;
          songInPlaylist.innerHTML += '<div id="g' + package.songs[k].id + '" class="sres"><div class="rectangle col-xs-2 col-md-2"></div><h4 class="col-xs-8 col-md-8">' + package.songs[k].title + '</h4><span class="glyphicon glyphicon-plus-sign col-xs-1 col-md-1" onclick="showModal(this)"></span><span class="glyphicon glyphicon-play col-xs-1 col-md-1"></span><h6 class="col-xs-6 col-md-6">' + package.playlists[j].name + '</h6></div><hr>';
        }
      }

    }
  }
}
var allPlaylist = document.getElementsByClassName("pres");
console.log(allPlaylist.length);



//search

function getInsideS(playlistId) {
  songInPlaylistS.innerHTML ='';
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
  for(j = 0; j < package.playlists.length; j++){
    if(playlistId.charAt(0) == "y" && Number(playlistId.charAt(1)) === package.playlists[j].id ) {
      console.log(playlistId.charAt(1));
      //console.log(package.playlists[j].id);
      for(k=0; k < package.songs.length; k++) {
        if((package.playlists[j].songs).includes(package.songs[k].id)){
          hOneS.innerHTML = package.playlists[j].name;
          songInPlaylistS.innerHTML += '<div id="v' + package.songs[k].id + '" class="sres"><div class="rectangle col-xs-2 col-md-2"></div><h4 class="col-xs-8 col-md-8">' + package.songs[k].title + '</h4><span class="glyphicon glyphicon-plus-sign col-xs-1 col-md-1" onclick="showModal(this)"></span><span class="glyphicon glyphicon-play col-xs-1 col-md-1"></span><h6 class="col-xs-6 col-md-6">' + package.songs[k].album + '</h6></div><hr>';
        }
      }

    }
  }
}

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
      //playlistInPage.innerHTML += '<div id="z' + package.playlists[j].id + '" class="pres"><div class="rectangle"></div><h4>' + package.playlists[j].name + '</h4><span class="glyphicon glyphicon-chevron-right"></span></div><hr>';
      allSearchPlaylist[j].style.display="block";

      //var q = allSearchPlaylist[j].getAttribute("id");
      //console.log("q is " + q);
      //clickEventS(j, q);
      console.log("after event");
      console.log("get search playlist " + j);
    }
  }
  for(i = 0; i < allSearchSong.length; i++) {

    if((inp !== "") && (allSearchSong[i].childNodes[1].textContent.indexOf(inp) >= 0 || package.songs[i].artist.indexOf(inp) >= 0)) {

      //songInPlaylist.innerHTML += '<div id="y' + package.songs[i].id + '" class="pres"><div class="rectangle"></div><h4>' + package.songs[i].title + '</h4><span class="glyphicon glyphicon-chevron-right"></span></div><hr>';
      allSearchSong[i].style.display="block";
      console.log("get search songs " + i);

    }
  }
}

searchBox.addEventListener("keyup", searchComplete);

}


//post data to playlist.json


$('#sprec1').on('click', function(){
    var input = prompt("What's the name of your new playlist?");
    if(input === ""){
        alert("Your input is empty!");
        return;
    }
    var obj = {
        "id":package.playlists.length,
        "name":input,
        "songs":[]
    }
    console.log('add playlists function');
    playlistsObj2.playlists.push(obj);
    var newFile = JSON.stringify(playlistsObj2,null,2);


    $.ajax({
        type: 'POST',
        url: '/tra/playlists',
        crossDomain: true,
        dataType: "json",
        data: newFile,
    });
    location.reload();

});

function showModal(elem) {
  document.getElementById("modal-playlist").innerHTML = '';
  //console.log(elem);
  openModal();
  var songTab = elem.parentNode;
  var songTabId = songTab.getAttribute("id").substr(1);
  console.log("song to add " + songTabId);
  for(i=0; i < package.playlists.length; i++){
    document.getElementById("modal-playlist").innerHTML += '<div class="innerPlaylist" id=e"' + package.playlists[i].id + '" onclick="addToPlaylist(' + package.playlists[i].id + ', ' + songTabId + ')"><h5>' + package.playlists[i].name + '</h5></div>';
  }

}

function addToPlaylist(ele, ID) {
  //console.log(ele);
  //alert(ID)
  console.log("playTabId " + ele);
  console.log((package.playlists[1].id).toString());
  for(i=0; i < package.playlists.length; i++){
    if((package.playlists[i].id) == ele) {
      console.log("playlist to add " + ele);
      if(!package.playlists[i].songs.includes(ID)){
        console.log("can add song " + ID + " to playlist " + ele);
        playlistsObj2.playlists[i].songs.push(ID);
        var newSong = JSON.stringify(playlistsObj2,null,2);


        $.ajax({
            type: 'POST',
            url: '/tra/playlists',
            crossDomain: true,
            dataType: "json",
            data: newSong,
        });
        location.reload();
      }else{
        alert("song already exists in the playlist");
      }
    }
    else {
      console.log("no suitable playlist, something is wrong");
    }
  }

}
