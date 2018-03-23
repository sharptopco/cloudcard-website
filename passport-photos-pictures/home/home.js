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

function pad(num) {
    return (num+"").padStart(2, '0')
}

function generateRandomEmailAddress() {
    var username = defaultEmailAddress.split("@")[0];
    var domain = defaultEmailAddress.split("@")[1];
    var currentdate = new Date();
    var datetime = pad(currentdate.getMonth()+1)  + "."
        + pad(currentdate.getDate()) + "_"
        + pad(currentdate.getHours())
        + pad(currentdate.getMinutes());
    return username + "+" + datetime + "_" + makeid(4) + "@" + domain;
}

function onFileChange(element) {
    fileInput = element;
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#selected-image').attr('src', e.target.result).width('75%');
            transitionFromTo('#user-icon', '#selected-image');
            data.encodedImage = e.target.result;
            var email = generateRandomEmailAddress();
            console.log('email address: ', email);
            data.email = email;
            post(data);
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
