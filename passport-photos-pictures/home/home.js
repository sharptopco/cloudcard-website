var URL = 'https://' + API_URL + '/api/passport-photos';
var data = {
    'email': null,
    'encodedImage': null
}
var defaultEmailAddress = 'tony@sharptop.io';

function showStepOne() {
    transitionFromTo('.step-two', '.step-one')
}

function showStepTwo() {
    transitionFromTo('.step-one', '.step-two')
}

function showStepThree() {
    transitionFromTo('.step-two', '.step-three')
}

function showSelectedImage(encodedImage) {
    $('#selected-image').attr('src', encodedImage).width('75%');
    transitionFromTo('#user-icon', '#selected-image');
}

function transitionFromTo(from, to) {
    var elementsToShow = $(to);
    var elementsToHide = $(from);

    elementsToHide.fadeOut(500, function () {
        elementsToHide.hide('slow');
        elementsToShow.fadeIn(500, function () {
            elementsToShow.show();
        });
    });
}

function pad(num) {
    return (num+"").padStart(2, '0')
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
