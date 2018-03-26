var URL = PROTOCOL + API_URL + '/api/passport-photos';
var data = {
    'email': null,
    'encodedImage': null
}
var defaultEmailAddress = 'tony@sharptop.io';
var cloudCardPhoto = null;

function init() {
    cloudCardPhoto = JSON.parse(localStorage.getItem('cloudCardPhoto'))
    startCropMessageTimer();
    $('#skip-video > a').attr('href', routes.yourPhoto);
    setTimeout(function () {
        transitionFromTo($('#loading'), $('#component-content'));
    }, 1000);
}

function fadeIn(elementsToShow) {
    elementsToShow.fadeIn(500, function () {
        elementsToShow.show();
    });
}

function transitionFromTo(elementsToHide, elementsToShow) {
    elementsToHide.fadeOut(500, function () {
        elementsToHide.hide('slow');
        fadeIn(elementsToShow);
    });
}

function startCropMessageTimer() {
    startTimer(30, document.querySelector('#crop-message-timer'));
    fadeIn($('#crop-message'));
}

function startTimer(duration, display) {
    var seconds = duration;
    setInterval(function () {
        display.textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--seconds < 0) {
            duration += 15
            seconds = duration;
            console.log('bacon');
            checkIfImageIsCropped();
        }
    }, 1000);
}

function get(url) {
    $.ajax({
        url: url,
        success: function (response) {
            console.log('sussess response: ', response);
            if(response.status) {
                console.log('the image has been cropped');
                transitionFromTo($('#crop-message'), $('#skip-video'));
            } else {
                console.log('still waiting for the image to be cropped');
            }
        },
        error: function (response) {
            console.log('error response: ', response);
        }
    });
}

function checkIfImageIsCropped() {
    if (!cloudCardPhoto) {
        console.log('no response from CloudCard');
        return;
    }
    get(cloudCardPhoto.cropStatus);
}