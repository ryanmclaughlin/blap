var api_key = 'C275dx9HxKmshCVEbPliHaTNVE3Xp1fFSJcjsnOxTpqSAhuOh4';
var api_endpoint = 'https://savedeo.p.mashape.com/download';

Meteor.methods({

  saveDeo: function (url_link) {
    var response = HTTP.get(api_endpoint, {
      headers: {
        'X-Mashape-Key': api_key
      },
      params: {
        url: url_link
      }

    });

    return response;
  }

});
