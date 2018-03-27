var waitTime = 15;

function init() {
    startCropMessageTimer();
    $('#skip-video > a').attr('href', routes.yourPhoto);
}

function startCropMessageTimer() {
    startTimer(waitTime, document.querySelector('#crop-message-timer'));
    fadeIn($('#crop-message'));
}

function startTimer(duration, display) {
    var seconds = duration;
    setInterval(function () {
        display.textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--seconds < 0) {
            duration *= 2
            seconds = duration;
            checkIfImageIsCropped();
        }
    }, 1000);
}
