/**
 * Created by mazay1907 on 3/29/2016.
 */
// ВОПРОС: как сделать чтобы не дергался?

var ball = document.getElementById("progr-bar-point"),
    bar = document.getElementById("progress-bar"),
    widthProgBarSize = bar.getBoundingClientRect().width,
    barConteiner = document.getElementById("progress-bar-conteiner"),
    topOfElem = barConteiner.getBoundingClientRect().top,
    leftOfElem = barConteiner.getBoundingClientRect().left - ball.offsetWidth / 2,
    rightOfElem = barConteiner.getBoundingClientRect().right - ball.offsetWidth / 2;
//leftOfElem = leftOfElem.toFixed();

ball.onmousedown = function(e) { // 1. отследить нажатие
    // подготовить к перемещению
    // 2. разместить на том же месте, но в абсолютных координатах
    ball.style.position = 'absolute';
    moveAt(e);
    // переместим в body, чтобы мяч был точно не внутри position:relative
    document.body.appendChild(ball);

    ball.style.zIndex = 1000; // показывать мяч над другими элементами

    // передвинуть мяч под координаты курсора
    // и сдвинуть на половину ширины/высоты для центрирования
    function moveAt(e) {
        var leftRightMove = e.pageX - ball.offsetWidth / 2;

        if (leftRightMove >= (leftOfElem + ball.offsetWidth / 2) && (leftRightMove <= rightOfElem + ball.offsetWidth / 2)) {
            ball.style.left = (leftRightMove - 1) + 'px';
            curentProgress.style.width = (leftRightMove - leftOfElem)   + "px";
        }
        else if (leftRightMove < leftOfElem + ball.offsetWidth / 2) {
            //ball.style.left = leftOfElem + 'px';
            curentProgress.style.width = 0;

        }
        else {
            //ball.style.left = rightOfElem + 'px';
            curentProgress.style.width =widthProgBarSize + 'px';

        }
        ball.style.top = topOfElem + 'px';
        Name(e);
    }
    // 3, перемещать по экрану
    document.onmousemove = function(e) {
        moveAt(e);
    };
    ball.ondragstart = function() {
        return false;
    };
    // 4. отследить окончание переноса
    ball.onmouseup = function() {
        //playlist[trackNum].play();
        document.onmousemove = null;
        ball.onmouseup = null;
    };
    barConteiner.onmouseout = function(e) {
        document.onmousemove = null;
        ball.onmouseup = null;

    };

};



function Name(e) {
    var durationCurSong = playlist[trackNum].duration,
        pxInSec = durationCurSong / widthProgBarSize,
        newProgress = (e.pageX - (leftOfElem)).toFixed(1),
        timeFromPx = newProgress * pxInSec;
    //pxInSec = widthProgBarSize / durationCurSong;

    //curentProgress.style.width = newProgress  + "px";
    playlist[trackNum].currentTime = timeFromPx;
}








/*
 test.onclick = function() {
 //console.log(x1.getBoundingClientRect());
 };
 // 450 750

 x1.onmousedown = function (e) {
 e = e || window.event;
 //progressBarPoint.style.left = e.clientX + 10 + "px";

 console.log(e.clientX);
 console.log(e.clientY);
 };
 x1.onmousemove = function (e) {
 e = e || window.event;
 var a = e.clientX + 100;
 progressBarPoint.style.left = a + "px";
 }

 */
