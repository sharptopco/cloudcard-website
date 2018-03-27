var waitTime = 15;

function init() {
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

function checkIfImageIsCropped() {
    $.ajax({
        url: getCloudCardPhotoFromLocalStorage().cropStatus,
        success: function (response) {
            if(response.status) {
                transitionFromTo($('#crop-message'), $('#next-button'));
            }
        }
    });
}

function next() {
    window.location.href = routes.yourPhoto;
};