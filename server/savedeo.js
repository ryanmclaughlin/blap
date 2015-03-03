var api_key = 'C275dx9HxKmshCVEbPliHaTNVE3Xp1fFSJcjsnOxTpqSAhuOh4';
var api_endpoint = 'https://savedeo.p.mashape.com/download';

Meteor.methods({

  saveDeo: function (url_link) {
    var response = HTTP.post(api_endpoint, {
      headers: {
        'X-Mashape-Key': api_key,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      params: {
        url: url_link
      }

    });

    return response;
  }

});
