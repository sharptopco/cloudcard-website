var URL = PROTOCOL + API_URL + '/api/passport-photos';
var data = {
    'email': null,
    'encodedImage': null
}

function init() {
    getPhoto();
    setTimeout(function () {
        transitionFromTo($('#loading'), $('#component-content'));
    }, 1000);
}

function fadeIn(elementsToShow) {
    elementsToShow.fadeIn(500, function () {
        elementsToShow.show();
        elementsToShow.removeClass('hidden');
    });
}

function transitionFromTo(elementsToHide, elementsToShow) {
    elementsToHide.fadeOut(500, function () {
        elementsToHide.hide('slow');
        fadeIn(elementsToShow);
    });
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
            localStorage.setItem('photoKey', response.key)
            window.location.href = routes.professionalReviewThankYou;
        }
    });
}

function submit() {
    data.email = $('#email').val();
    post(data);
}

function getPhoto() {

    cloudCardPhoto = JSON.parse(localStorage.getItem('cloudCardPhoto'))
    toDataURL(cloudCardPhoto.bytes, function (encodedImage) {
        data.encodedImage = encodedImage;
    });

    // console.log('cloudCardPhoto', cloudCardPhoto)
    // $.ajax({
    //     url: cloudCardPhoto.bytes,
    //     success: function (response) {
    //         console.log('sussess response: ', response.length);
    //         data.bytes = response;
    //     },
    //     error: function (response) {
    //         console.log('error response: ', response);
    //     }
    // });
}

function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}