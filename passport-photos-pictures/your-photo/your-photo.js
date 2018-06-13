function init() {
    var photoKey = getPhotoKey()
    $('.your-photo-div').css("background-image", "url(//" + API_URL + "/api/passport-photos/" + photoKey + "/bytes)");
    setTimeout(function () {
        transitionFromTo($('#loading'), $('#your-photo-content'));
        $('#your-photo-content').addClass('centered')
    }, 1000);
}

function init4x6() {
    var photoKey = getPhotoKey();
    $('.your-photo-div-4x6').css("background-image", "url(//" + API_URL + "/api/passport-photos/" + photoKey + "/bytes)");
    setTimeout(function () {
        transitionFromTo($('#loading-4x6'), $('#your-photo-content-4x6'))
        $('#your-photo-content-4x6').addClass('centered')
    }, 1000);
}
