
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
            callback(response);
        }
    });
}
