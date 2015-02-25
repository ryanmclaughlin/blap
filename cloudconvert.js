if (Meteor.isServer) {
  var api_key = 'GUpX7rmee0taJkyGRACH282cwcguZERXcGVFeexwOlP-Vr-9riTzdcsuczLE_2KrlWj22DD9PFdqSMZbtrcv1g';
  var api_endpoint = 'https://api.cloudconvert.com/convert?apikey=' + api_key;

  Meteor.methods({

    cloudConvert: function () {
      var response = HTTP.get(api_endpoint, {
        params: {
          inputformat: 'mp4',
          outputformat: 'mp3',
          input: 'upload'
        }
      });
    }

  });
}


// var config  = __dirname + '/config.yml',
//     file    = __dirname + '/smaug.mp4';

// var $task   = new CloudConvert(config).convert(file).from('mp4').into('mp3').process();

// $task.when('uploading', function(data) {
//     console.log("We're uploading our file...");
// });
