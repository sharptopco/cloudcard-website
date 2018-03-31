function initDownloadPhoto() {
    var photoKey = getPhotoKey()
    var photoURL = "//" + API_URL + "/api/passport-photos/" + photoKey + "/bytes";
    $('#download-photo-image').attr("src", photoURL);
    $('.download-link').attr("href", photoURL);
    $('.sqs-block-button-element').attr("href", photoURL);
    $('.sqs-block-button-element').attr("download", "PassportPhoto.jpg");
    setTimeout(function () {
        transitionFromTo($('#loading'), $('#download-photo-content'));
        $('#download-photo-content').addClass('centered')
        $('.sqs-block-button-element').text("Download Photo");
    }, 1000);
}