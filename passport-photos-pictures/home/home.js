var fileInput = null;
var URL = 'https://' + API_URL + '/api/passport-photos';
var data = {
    'email': null,
    'encodedImage': null
}
var defaultEmailAddress = 'tony@sharptop.io';

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

function showStepOne() {
    transitionFromTo('.step-two', '.step-one')
}

function showStepTwo() {
    transitionFromTo('.step-one', '.step-two')
}

function showStepThree() {
    transitionFromTo('.step-two', '.step-three')
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

function generateRandomEmailAddress(baseAddress) {
    var username = baseAddress.split("@")[0];
    var domain = baseAddress.split("@")[1];
    var currentdate = new Date();
    var datetime = (currentdate.getMonth()+1)  + "."
        + currentdate.getDate() + "_"
        + currentdate.getHours()
        + currentdate.getMinutes();
    return username + "+" + datetime + "_" + makeid(4) + "@" + domain;
}

console.log('random email:', generateRandomEmailAddress(defaultEmailAddress));

function onFileChange(element) {
    fileInput = element;
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#selected-image').attr('src', e.target.result).width('75%');
            transitionFromTo('#user-icon', '#selected-image');
            data.encodedImage = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
        setTimeout(function () {
            // showStepTwo();
        }, 1000);
    }
}

function submit() {
    data.email = $('#email').val();
    post(data);
    showStepThree();
}
