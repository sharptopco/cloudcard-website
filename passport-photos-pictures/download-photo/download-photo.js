function initDownloadPhoto() {
    var photoURL = getPhotoURL();

    create4x6Image(photoURL)
    $('#download-photo-image').attr("src", photoURL);
    $('.download-link').attr("href", photoURL);

    setTimeout(function () {
        var downloadPhotoContent = $('#download-photo-content');
        transitionFromTo($('#loading'), downloadPhotoContent);
        downloadPhotoContent.addClass('centered')
        setupSquarespaceButton(photoURL);

    }, 1000);
}

function initDownloadPhoto4x6() {
    setTimeout(function () {
        var downloadPhotoContent4x6 = $('#download-photo-content-4x6');
        transitionFromTo($('#loading-4x6'), downloadPhotoContent4x6);
        downloadPhotoContent4x6.addClass('centered')
    }, 1000);

}

function create4x6Image(photoURL){
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = photoURL;
    img.onload = function(){
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 200, 300, 600, 600);
        ctx.drawImage(img, 1000, 300, 600, 600);
        ctx.strokeRect(200, 300, 600, 600);
        ctx.strokeRect(1000, 300, 600, 600);
        var fourBySixImg = canvas.toDataURL("image/png");
        $('#four-by-six-image').attr("src", fourBySixImg);
    }
}

function setupSquarespaceButton(photoURL) {
    var squareSpaceButton = $('.sqs-block-button-element');
    squareSpaceButton.text("Download Photo");
    squareSpaceButton.attr("href", photoURL);
    squareSpaceButton.attr("download", "PassportPhoto.jpg");
}

function getPhotoURL() {
    var photoKey = getPhotoKey()
    var photoURL = "//" + API_URL + "/api/passport-photos/" + photoKey + "/bytes";
    return photoURL;
}

