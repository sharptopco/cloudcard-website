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

        var width = ctx2.canvas.width;
        var height = ctx2.canvas.height;
        var data = ctx2.getImageData(0, 0, width, height);
        var compositeOperation = ctx2.globalCompositeOperation;
        ctx2.globalCompositeOperation = "destination-over";
        ctx2.fillStyle = "#FFFFFF";
        ctx2.fillRect(0,0,w,h);

        ctx2.drawImage(img, 200, 300, 600, 600);
        ctx2.drawImage(img, 1000, 300, 600, 600);
        ctx2.strokeRect(200, 300, 600, 600);
        ctx2.strokeRect(1000, 300, 600, 600);
        var fourBySixImg = fourBySixCanvas.toDataURL("image/jpeg");

        ctx2.clearRect (0,0,w,h);
        ctx2.putImageData(data, 0,0);
        ctx2.globalCompositeOperation = compositeOperation;

        $('#four-by-six-image').attr("src", fourBySixImg);

        var twoByTwoCanvas = document.getElementById('twoByTwoCanvas');
        var ctx1 = twoByTwoCanvas.getContext('2d');

        var width = ctx1.canvas.width;
        var height = ctx1.canvas.height;
        var data = ctx1.getImageData(0, 0, width, height);
        var compositeOperation = ctx1.globalCompositeOperation;
        ctx1.globalCompositeOperation = "destination-over";
        ctx1.fillStyle = "#FFFFFF";
        ctx1.fillRect(0,0,w,h);

        ctx1.drawImage(img, 600, 300, 600, 600);
        ctx1.strokeRect(600, 300, 600, 600);
        var twoByTwoImg = twoByTwoCanvas.toDataURL("image/jpeg");

        ctx1.clearRect (0,0,w,h);
        ctx1.putImageData(data, 0,0);
        ctx1.globalCompositeOperation = compositeOperation;

        $('#two-by-two-image').attr("src", twoByTwoImg);
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

