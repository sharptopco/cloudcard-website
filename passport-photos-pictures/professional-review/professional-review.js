var data = { };

function init() {
    getPhoto();
    setTimeout(function () {
        transitionFromTo($('#loading'), $('#component-content'));
    }, 1000);
}

function submit() {
    data.email = $('#email').val();
    post(data, function () {
        window.location.href = routes.professionalReviewThankYou;
    });
}

function getPhoto() {
    cloudCardPhoto = JSON.parse(localStorage.getItem('cloudCardPhoto'))
    toDataURL(cloudCardPhoto.bytes, function (encodedImage) {
        data.encodedImage = encodedImage;
    });
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