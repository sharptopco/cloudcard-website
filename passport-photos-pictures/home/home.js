var URL = PROTOCOL + API_URL + '/api/passport-photos';
var data = {
    'email': null,
    'encodedImage': null
}
var defaultEmailAddress = 'tony@sharptop.io';
var cloudCardResponse = null;

function init() {
    setTimeout(function () {
        transitionFromTo($('#loading'), $('#uploader-content'));
    }, 1000);
}

function showSelectedImage(encodedImage) {
    var selectedImage = $('#selected-image');
    selectedImage.attr('src', encodedImage).width('75%');
    transitionFromTo($('#user-icon'), selectedImage);
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

function pad(num) {
    return (num + "").padStart(2, '0')
}

function getDateString() {
    var currentdate = new Date();
    var datetime = pad(currentdate.getMonth() + 1) + "."
        + pad(currentdate.getDate()) + "_"
        + pad(currentdate.getHours())
        + pad(currentdate.getMinutes());
    return datetime;
}

function generateRandomEmailAddress() {
    var username = defaultEmailAddress.split("@")[0];
    var domain = defaultEmailAddress.split("@")[1];
    return username + "+" + getDateString() + "_" + makeid(4) + "@" + domain;
}

function onFileChange(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var encodedImage = e.target.result;
            postImage(encodedImage);
            showSelectedImage(encodedImage);
            fadeIn($('#next-button'));
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

function postImage(encodedImage) {
    data.encodedImage = encodedImage;
    var email = generateRandomEmailAddress();
    console.log('email address: ', email);
    data.email = email;
    post(data);
}

function post(data) {
    $.ajax({
        type: 'POST',
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            console.log('response', response);
            cloudCardResponse = response;
            localStorage.setItem('photoKey', response.key)
        }
    });
}

function submit() {
    data.email = $('#email').val();
    post(data);
    showStepThree();
}

function startVideo() {
    $('#video').attr("src", "https://www.youtube.com/embed/QNPgvt6j1MA?autoplay=1");
}

function startCropMessageTimer() {
    startTimer(60, document.querySelector('#crop-message-timer'));
    fadeIn($('#crop-message'));
}

function stepTwo() {
    transitionFromTo($('.step-one'), $('.step-two'));
    var twoSeconds = 2000;
    setTimeout(function () {
        transitionFromTo($('.spinner'), $('.advertisement'));
        startVideo();
        startSkipTimer(10, document.querySelector('#skip-timer'));
    }, twoSeconds);
};

function stepThree() {
    $('#video').attr("src", "about:blank");
    transitionFromTo($('.step-two'), $('.step-three'));
    // startTimer(5, document.querySelector('#timer'));
    fadeIn($('#crop-message'));
};

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
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

function startSkipTimer(duration, display) {
    var seconds = duration;
    var refreshIntervalId = setInterval(function () {
        display.textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--seconds < 0) {
            console.log('skip timer hit 0');
            transitionFromTo($('#skip-video-countdown'), $('#skip-video'));
            startCropMessageTimer();
            clearInterval(refreshIntervalId);
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
                window.location.replace('/your-photo');
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
    if (!cloudCardResponse) {
        console.log('no response from CloudCard');
        return;
    }
    get(cloudCardResponse.cropStatus);
}