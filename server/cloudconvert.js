if (Meteor.isServer) {
  var api_key = 'GUpX7rmee0taJkyGRACH282cwcguZERXcGVFeexwOlP-Vr-9riTzdcsuczLE_2KrlWj22DD9PFdqSMZbtrcv1g';
  var api_endpoint = 'https://api.cloudconvert.com/convert?apikey=' + api_key;

  Meteor.methods({

    cloudConvert: function (inputParams) {
      var response = HTTP.post(api_endpoint, {
        params: inputParams
      });
    }

  });
}
