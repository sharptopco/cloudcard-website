
function getCloudCardPhotoFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cloudCardPhoto'));
}

function post(data, callback) {
    $.ajax({
        type: 'POST',
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            console.log('response', response);
            localStorage.setItem('cloudCardPhoto', JSON.stringify(response));
            if(callback != null) {
                callback(response);
            }
        }
    });
}

function getPhotoKey() {
    var photoKey = getParameterByName('photoKey');
    if(!photoKey) {
        photoKey = JSON.parse(localStorage.getItem('cloudCardPhoto')).key;
    }
    return photoKey;
}
