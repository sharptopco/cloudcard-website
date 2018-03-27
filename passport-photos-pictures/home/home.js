var defaultEmailAddress = 'noreply@onlinephotosubmission.com';

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
    post({
        'email': generateRandomEmailAddress(),
        'encodedImage': encodedImage
    });
}

function next() {
    window.location.href = routes.professionalReview;
};