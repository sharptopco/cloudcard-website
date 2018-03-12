var fileInput = null;
var URL = 'https://api.onlinephotosubmission.com/api/passport-photos';
var data = {
    'email': null,
    'encodedImage': null
}

function post(data) {
    $.ajax({
        type: 'POST',
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data)
    });
}

function showStepOne() {
    $('.step-one').show('slow');
    $('.step-two').hide('slow');
    $('.step-three').hide('slow');
}

function showStepTwo() {
    $('.step-one').hide('slow');
    $('.step-two').show('slow');
    $('.step-three').hide('slow');
}

function showStepThree() {
    $('.step-one').hide('slow');
    $('.step-two').hide('slow');
    $('.step-three').show('slow');
}

function onFileChange(element) {
    fileInput = element;
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#selected-image').attr('src', e.target.result).width('75%');
            $('#selected-image').show();
            $('#user-icon').hide();
            data.encodedImage = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
    showStepTwo();
}

function submit() {
    data.email = $('#email').val();
    post(data);
    showStepThree();
}
