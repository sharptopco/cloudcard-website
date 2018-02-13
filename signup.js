var URL = 'https://app.onlinephotosubmission.com/api/organizations/signup'

var data = {
    "name": "this is the ORG name from your form",
    "email": "this comes from your form"
}

if (leadId) {
    $.ajax({
        type: 'POST',
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data)
    });
}
