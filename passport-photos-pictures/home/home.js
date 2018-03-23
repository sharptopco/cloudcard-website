var URL = 'https://' + API_URL + '/api/passport-photos';
var data = {
    'email': null,
    'encodedImage': null
}
var defaultEmailAddress = 'tony@sharptop.io';

$(function () {
    setTimeout(function () {
        transitionFromTo($('#loading'), $('#uploader-content'));
    }, 1000);
});

function showStepOne() {
    transitionFromTo($('.step-two'), $('.step-one'))
}

function showStepTwo() {
    transitionFromTo($('.step-one'), $('.step-two'))
}

function showStepThree() {
    transitionFromTo($('.step-two'), $('.step-three'))
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
        }
    });
}

function submit() {
    data.email = $('#email').val();
    post(data);
    showStepThree();
}

function stepTwo() {
    transitionFromTo($('.step-one'), $('.step-two'));
    var twoSeconds = 2000;
    var oneMinute = 60000;
    setTimeout(function () {
        transitionFromTo($('.spinner'), $('.advertisement'));
        $('#video').attr("src", "https://www.youtube.com/embed/QNPgvt6j1MA?autoplay=1");
        setTimeout(function (args) {
            console.log('video done');
            transitionFromTo($('.step-two'), $('.step-three'));
        }, oneMinute + twoSeconds);
    }, twoSeconds);
};

function stepThree() {
    $('#video').attr("src", "about:blank");
    transitionFromTo($('.step-two'), $('.step-three'));
    startTimer(30, document.querySelector('#timer'));
};

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function startTimer(duration, display) {
    var seconds = duration;
    setInterval(function () {
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds ;

        if (--seconds < 0) {
            seconds = duration;
        }
    }, 1000);
}