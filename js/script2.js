/**
 * Created by mazay1907 on 3/25/2016.
 */

function addPlaylist(songArray) {
var playlist = [],
    trackNum = 0,
    num = Math.floor((Math.random() * songArray.songListenUrl.length-20) + 1);
    musicName = {};

for (var _songName = 0; _songName < 10; _songName++){
    var myaudio = new Audio(songArray.songListenUrl[_songName]);
    playlist[_songName] = myaudio;
    musicName[_songName] = "<b>" + songArray.artistName[_songName+num] + "</b> " + songArray.songName[_songName+num];
}
        playerOptions(playlist, musicName, trackNum);
}


function playerOptions(playlist, musicName, trackNum) {
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
    bar = document.getElementById("progress-bar"),
    curentProgress = document.getElementById("curent-progress"),
    progressSpan = document.getElementById("progr-bar-point"),
    test = document.getElementById("test"),
    currentSongTime,
    progress,
    currentTime;

    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    var size = Object.size(musicName);
    for (var x = 0; x < size; x++) {
        var li = document.createElement("li"),
            qaz = x+1;
        li.innerHTML = qaz + " " + musicName[x];
        songList.appendChild(li);
    }

// Play music function and change play btn name
    function playMusic() {
        switch (playlist[trackNum].paused) {
            case true:
                console.log(trackNum);
                playlist[trackNum].play();
                nameField.innerHTML = musicName[trackNum];
                songList.getElementsByTagName("li")[trackNum].className += " selected";
                btn.firstChild.className = "glyphicon glyphicon-pause";
                playlist[trackNum].addEventListener("timeupdate", function () {
                    timeInMinutes(trackNum);
                    currentTimeElem.innerHTML = currentSongTime;
                    curentProgress.style.width = progress + "px";
                    if (progress > 0) {
                        test.style.left = progress - 7.8 + "px";
                    }
                });
                setInterval(setTimeOfEnd, 3000);
                break;
            default:
                playlist[trackNum].pause();
                btn.firstChild.className = "glyphicon glyphicon-play";
                break;
        }
    }

    function timeInMinutes(trackNum) {
        currentTime = playlist[trackNum].currentTime.toFixed();
        var duration = playlist[trackNum].duration.toFixed(),
            min = Math.floor(currentTime / 60),
            sec = Math.floor(currentTime % 60);
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        currentSongTime = min + ':' + sec;
        progress = 300 * currentTime / duration;
    }

// change to next song
    function nextSound() {
        var prevTrackNum = trackNum;
        switch (trackNum == playlist.length - 1) {
            case false:
                trackNum = trackNum + 1;
                break;
            case true:
                prevTrackNum = playlist.length - 1;
                trackNum = 0;
        }
        songList.getElementsByTagName("li")[prevTrackNum].className = "";
        isPausePlay(trackNum, prevTrackNum);
    }

// change to previous song
    function prevSound() {
        var prevTrackNum = trackNum;
        if (trackNum != -1) {
            trackNum = trackNum - 1;
        }
        if (trackNum == -1) {
            prevTrackNum = 0;
            trackNum = playlist.length - 1;
        }
        songList.getElementsByTagName("li")[prevTrackNum].className = "";
        isPausePlay(trackNum, prevTrackNum);
    }


// paused previous song
    function isPausePlay(trackNum, prevTrackNum) {
        if (playlist[trackNum].paused == true) {
            playlist[prevTrackNum].pause();

        }
        playMusic();
    }

// 5 sec to current song
    function forwardSound() {
        var curTime = playlist[trackNum].currentTime + 5.0;
        playlist[trackNum].currentTime = curTime;
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
    function MuteBtnOnOff() {
        switch (playlist[trackNum].muted) {
            case false:
                playlist[trackNum].muted = true;
                mute.className += " selected";
                break;
            default:
                playlist[trackNum].muted = false;
                mute.className = "glyphicon glyphicon-volume-off icons";
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

        btn.addEventListener("click", playMusic);
        next.addEventListener("click", nextSound);
        prev.addEventListener("click", prevSound);
        mute.addEventListener("click", MuteBtnOnOff);
        plusTime.addEventListener("click", forwardSound);
        minusTime.addEventListener("click", backSound);
        minusVolume.addEventListener("click", minusVolumeControl);
        plusVolume.addEventListener("click", plusVolumeControl);


        bar.onmousedown = function (e) {
            changeCurrentProgress(e);
            function changeCurrentProgress(e) {
                var leftOfElem = bar.getBoundingClientRect().left,
                    onClickPoss = e.pageX,
                    newWidthOfCurrProgress = onClickPoss - leftOfElem;
                if (newWidthOfCurrProgress > 0 && newWidthOfCurrProgress <= 300) {
                    curentProgress.style.width = newWidthOfCurrProgress + "px";
                    playlist[trackNum].currentTime = (newWidthOfCurrProgress * playlist[trackNum].duration.toFixed()) / 300;
                }

            }

            document.onmousemove = function (e) {
                changeCurrentProgress(e);
            };
            document.ondragstart = function () {
                return false;
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                bar.onmouseup = null;
            }
        };

    }