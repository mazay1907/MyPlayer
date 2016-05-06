/**
 * Created by mazay1907 on 4/4/2016.
 */
var oReq = new XMLHttpRequest(),
    fullLink = "https://freemusicarchive.org/featured.json";
oReq.open("GET", fullLink);
oReq.send();

oReq.onload = function() {
    var getParam = oReq.responseText,
        objOfParam = JSON.parse(getParam),
        songArray = {
            songDownloadUrl : [],
            songListenUrl : [],
            songName : [],
            artistName : [],
            albumImageFile : []
        },
        max = objOfParam.aTracks.length;
    for (var i=0; i<max; i++) {
        var trackId = objOfParam.aTracks[i].track_file_url.slice(44);
        songArray.songDownloadUrl[i] = trackId;
        songArray.songListenUrl[i] = "https://freemusicarchive.org/music/listen/" + trackId;
        songArray.artistName[i] = objOfParam.aTracks[i].artist_name;
        songArray.songName[i] = objOfParam.aTracks[i].track_title;
        songArray.albumImageFile[i] = objOfParam.aTracks[i].album_image_file
    }
    console.log( objOfParam.aTracks[5]);
    addPlaylist(songArray);
    };
oReq.onerror = function() {
    alert('Woops, there was an error making the request.');
};
