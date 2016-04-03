/**
 * Created by mazay1907 on 3/25/2016.
 */

var playlist = [],
    trackNum = 0,
    musicName = {1:"<b>Денис Майданов</b> - Территория Сердца (Дуэт С Лолитой)",
        2:"<b>Лицей</b> - Фотография",
        3:"<b>Маша Кольцова</b> - Я Не Уйду",
        4:"<b>A - Studio</b> - Вот она любовь"};
for (var _songName = 1; _songName < 5; _songName++){
    myaudio = new Audio('mp3/' + _songName + '.mp3');
    playlist[_songName - 1] = myaudio;
}



var btn = document.getElementById("btn"),
    prev = document.getElementById("prev"),
    next = document.getElementById("next"),
    mute = document.getElementById("mute"),
    minusTime = document.getElementById("minus-time"),
    plusTime = document.getElementById("plus-time"),
    nameField = document.getElementsByClassName("music-name")[0],
    plusVolume = document.getElementById("plus-volume"),
    minusVolume = document.getElementById("minus-volume"),
    songList = document.getElementById("song-list1"),
    currentTimeElem = document.getElementById("current-time"),
    curentProgress = document.getElementById("curent-progress"),
    progressBarPoint = document.getElementById("progr-bar-point"),
//progressBarPointLeftPos = ,
    currentSongTime,  // time was played of current song (min:sec)
    progress,         // time was played of current song (px)
    currentTimeSong;  // time was played of current song (sec)

progressBarPoint.style.left = curentProgress.getBoundingClientRect().right - progressBarPoint.offsetWidth / 2 - 1 + "px";
console.log("1 " + progressBarPoint.style.left);
for (var x = 1; x < 5; x++){
    var li = document.createElement("li");
    li.innerHTML = musicName[x];
    songList.appendChild(li);
}
// Play music function and change play btn name
function playMusic(){
    switch (playlist[trackNum].paused) {
        case true:
            //playlist[trackNum].currentTime = 0;
            playlist[trackNum].play();
            nameField.innerHTML = musicName[trackNum+1];
            songList.getElementsByTagName("li")[trackNum].className += " selected";
            btn.firstChild.className = "glyphicon glyphicon-pause";
            playlist[trackNum].addEventListener("timeupdate", function() {
                timeInMinutes(trackNum);
                currentTimeElem.innerHTML = currentSongTime;
                curentProgress.style.width = progress   + "px";
                progressBarPoint.style.left = curentProgress.getBoundingClientRect().right - progressBarPoint.offsetWidth / 2 - 1+ "px";
                console.log(progress + " " + curentProgress.style.width + " " + progressBarPoint.style.left);
                /*if (progress > 0) {
                 progressBarPoint.style.left = (progress - 7.8 ) + "px"; /// to do
                 }*/
            });
            setInterval(setTimeOfEnd, 3000);
            break;
        default:
            playlist[trackNum].pause();
            btn.firstChild.className = "glyphicon glyphicon-play";
            break;
    }}

function timeInMinutes(trackNum) {
    currentTimeSong = playlist[trackNum].currentTime.toFixed();
    var duration = playlist[trackNum].duration.toFixed(),
        min = Math.floor(currentTimeSong / 60),
        sec = Math.floor(currentTimeSong % 60);
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    currentSongTime = min + ':' + sec;
    progress = (300*currentTimeSong/duration).toFixed(1);
}
// change to next song
function nextSound() {
    var prevTrackNum = trackNum;
    switch (trackNum == playlist.length-1) {
        case false:
            trackNum = trackNum + 1;
            break;
        case true:
            prevTrackNum = playlist.length-1;
            trackNum = 0;
    }
    songList.getElementsByTagName("li")[prevTrackNum].className = "";
    isPausePlay(trackNum,prevTrackNum);
}

// change to previous song
function prevSound() {
    var prevTrackNum = trackNum;
    if (trackNum != -1) {
        trackNum = trackNum - 1;
    }
    if (trackNum == -1) {
        prevTrackNum = 0;
        trackNum = playlist.length-1;
    }
    songList.getElementsByTagName("li")[prevTrackNum].className = "";
    isPausePlay(trackNum, prevTrackNum);
}


// paused previous song
function isPausePlay(trackNum,prevTrackNum) {
    if (playlist[trackNum].paused == true){
        playlist[prevTrackNum].pause();

    }
    playMusic();
}

// 5 sec to current song
function forwardSound() {
    var curTime = playlist[trackNum].currentTime + 5.0;
    playlist[trackNum].currentTime += 5;
    console.log(playlist[trackNum].currentTime);
    console.log(curTime);
}
function backSound() {
    var curTime = playlist[trackNum].currentTime - 5.0;
    playlist[trackNum].currentTime = curTime;
}

// check the end of song
function setTimeOfEnd() {
    var status = playlist[trackNum].ended;
    if (status == true) {
        nextSound();
    }
}
// Mute volume
function MuteBtnOnOff(){
    switch (playlist[trackNum].muted) {
        case false:
            playlist[trackNum].muted = true;
            mute.className += " selected";
            break;
        default:
            playlist[trackNum].muted = false;
            mute.className ="glyphicon glyphicon-volume-off icons";
            break;
    }
}

function plusVolumeControl() {
    var volume = playlist[trackNum].volume;
    if (volume <= 0.9) {
        volume += 0.1;
        for (var i = 0; i < playlist.length; i++) {
            playlist[i].volume = volume;
        }
    }
}
function minusVolumeControl() {
    var volume = playlist[trackNum].volume;
    if (volume >= 0.1) {
        volume -= 0.1;
        for (var i = 0; i < playlist.length; i++) {
            playlist[i].volume = volume;
        }
    }
}

// check keyboard events
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38' || e.keyCode == '61' || e.keyCode == '187' || e.keyCode == '107') {
        plusVolumeControl();
    }
    else if (e.keyCode == '40' || e.keyCode == '173' || e.keyCode == '189' || e.keyCode == '109') {
        minusVolumeControl();
    }
    else if (e.keyCode == '32') {
        playMusic();
    }
    else if (e.keyCode == '37') {
        prevSound();
    }
    else if (e.keyCode == '39') {
        nextSound();
    }
}

/*
 progressBarPoint.onmousedown = function (e) {
 console.log("test");
 dragObject = this;
 console.log(dragObject);

 return false;
 };

 document.onmouseup = function() {
 dragObject = null;
 };

 */


btn.addEventListener("click",  playMusic);
next.addEventListener("click", nextSound);
prev.addEventListener("click", prevSound);
mute.addEventListener("click", MuteBtnOnOff);
plusTime.addEventListener("click", forwardSound);
minusTime.addEventListener("click", backSound);
minusVolume.addEventListener("click", minusVolumeControl);
plusVolume.addEventListener("click", plusVolumeControl);
