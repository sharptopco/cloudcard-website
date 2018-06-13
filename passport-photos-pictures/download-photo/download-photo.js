function initDownloadPhoto() {
    var photoURL = getPhotoURL();

    // createImage(photoURL)
    // $('#download-photo-image').attr("src", photoURL);
    // $('.download-link').attr("href", photoURL);
    //
    setTimeout(function () {
        var downloadPhotoContent = $('#download-photo-content');
        transitionFromTo($('#loading'), downloadPhotoContent);
        downloadPhotoContent.addClass('centered')
        setupSquarespaceButton(photoURL);

    }, 1000);
}

function initDownloadPhoto4x6() {
    var photoURL = getPhotoURL();

    create4x6Image(photoURL)
    $('#download-photo-image').attr("src", photoURL);
    $('.download-link').attr("href", photoURL);

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
        var fourBySixCanvas = document.getElementById('fourBySixCanvas');
        var ctx2 = fourBySixCanvas.getContext('2d');
        ctx2.drawImage(img, 200, 300, 600, 600);
        ctx2.drawImage(img, 1000, 300, 600, 600);
        ctx2.strokeRect(200, 300, 600, 600);
        ctx2.strokeRect(1000, 300, 600, 600);
        var fourBySixImg = fourBySixCanvas.toDataURL("image/jpeg");
        $('#four-by-six-image').attr("src", fourBySixImg);

        var twoByTwoCanvas = document.getElementById('twoByTwoCanvas');
        var ctx1 = twoByTwoCanvas.getContext('2d');
        ctx1.drawImage(img, 600, 300, 600, 600);
        ctx1.strokeRect(600, 300, 600, 600);
        var twoByTwoImg = twoByTwoCanvas.toDataURL("image/jpeg");
        $('#two-by-two-image').attr("src", twoByTwoImg);
    }
}

// function createImage(photoURL){
//     var img = new Image();
//     img.crossOrigin = "Anonymous";
//     img.src = photoURL;
//     img.onload = function(){
//         var canvas = document.getElementById('myCanvas');
//         var ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 600, 300, 600, 600);
//         ctx.strokeRect(600, 300, 600, 600);
//         var twoByTwoImg = canvas.toDataURL("image/png");
//         $('#two-by-two-image').attr("src", twoByTwoImg);
//     }
// }

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

