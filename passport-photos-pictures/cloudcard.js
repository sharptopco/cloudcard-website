
function getCloudCardPhotoFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cloudCardPhoto'));
}

function checkIfImageIsCropped() {
    $.ajax({
        url: getCloudCardPhotoFromLocalStorage().cropStatus,
        success: function (response) {
            if(response.status) {
                transitionFromTo($('#crop-message'), $('#skip-video'));
            }
        }
    });
}
