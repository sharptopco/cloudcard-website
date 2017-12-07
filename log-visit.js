/**
 * ?SQF_ORG_NAME=Test%20Organization&lead_id=lead_lJTA56R67Tcd8Z412p8yq9HAo3PuwpVpSDkyb1Q2gb6&contact_name=Tony&contact_id=cont_fFkczw9vc6hTeTUmvw5UVJghZIPdjxeQGiNYw78sZiy
 */
var orgName = getFromParameterOrLocalStorage('SQF_ORG_NAME');
var authToken = getFromParameterOrLocalStorage('auth_token');
var leadId = getFromParameterOrLocalStorage('lead_id');
var contactId = getFromParameterOrLocalStorage('contact_id');

var URL = 'https://499duyi1u8.execute-api.us-east-1.amazonaws.com/prod/close-io-purl-handler'

var data = {
    "orgName": orgName,
    "url": window.location.href,
    "leadId": leadId,
    "contactId": contactId
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
