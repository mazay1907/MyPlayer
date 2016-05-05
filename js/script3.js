/**
 * Created by mazay1907 on 4/4/2016.
 */




function reqListener () {
    //console.log(res.writeHead);
    document.getElementById("apiMy").innerHTML = this.responseText;
}

/*
var oReq = new XMLHttpRequest();
var data = "q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22SFO%22&format=json";
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://query.yahooapis.com/v1/public/yql?" + data);
oReq.send();
*/



var oReq = new XMLHttpRequest();
var apiKey = "api_key=8EQKP0YX7FBO4BAO",
    link = "https://freemusicarchive.org/api/get/",
    datasetFormat = "q=track_url&format=json";
//oReq.addEventListener("load", reqListener);
//var fullLink = link + datasetFormat + "?" + apiKey;
//var fullLink = "https://freemusicarchive.org/api/trackSearch?q=deerhoof&limit=10";
//var fullLink = "https://freemusicarchive.org/music/charts/?genre=12&chart=listens";
var fullLink = "https://freemusicarchive.org/featured.json";
oReq.open("GET", fullLink);

oReq.send();

//console.log(oReq);
//console.log(oReq.readyState);
//console.log(oReq.responseText);

oReq.onload = function() {
    var getParam = oReq.responseText,
        objOfParam = JSON.parse(getParam),
        songArray = {
            songDownloadUrl : [],
            songListenUrl : [],
            songName : [],
            artistName : []
        },
        max = objOfParam.aTracks.length;
        //max = 10;
    for (var i=0; i<max; i++) {
        var trackId = objOfParam.aTracks[i].track_file_url.slice(44);
        songArray.songDownloadUrl[i] = trackId;
        songArray.songListenUrl[i] = "https://freemusicarchive.org/music/listen/" + trackId;
        songArray.artistName[i] = objOfParam.aTracks[i].artist_name;
        songArray.songName[i] = objOfParam.aTracks[i].track_title;
    }

    addPlaylist(songArray);
    };
oReq.onerror = function() {
    alert('Woops, there was an error making the request.');
};




//jsonp

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}


/*data = 'q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22SFO%22&format=json';

xhr = createCORSRequest('GET', 'http://query.yahooapis.com/v1/public/yql?' + data)

// Response handlers.
xhr.onload = function() {
    var text = xhr.responseText;
    var x = JSON.parse(text);
    console.log(text);
    console.log(x);
};*/
/*

xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
};

xhr.send();*/
