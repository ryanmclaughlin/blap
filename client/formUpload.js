
Template.formUpload.helpers({

});

Template.formUpload.events({
  'submit .form-converter': function (event) {
    var $form = $(event.target);
    var videoUrlInput = $form.find('.convert-form__video-url');
    var input = 'download';
    var inputformat = 'mp4';
    var outputformat = 'mp3';
    var trimFrom = $form.find('.convert-form__trim-from').val() || '0';
    var trimTo = $form.find('.convert-form__trim-to').val() || '0';

    if (!videoUrlInput.val()) {
      input = 'upload';
      file = $form.find('.convert-form__input-file').files[0];
    }

    var params = {
      'input': input,
      'inputformat': inputformat,
      'outputformat': outputformat,
      'file': file,
      'download': 'inline',
      'converteroptions[trim_from]': trimFrom,
      'converteroptions[trim_to]': trimTo
    };

    console.log(params);

    Meteor.call('cloudConvert', params, function(error, result) {
      if (!error) {
        console.log(result)
      } else {
        console.log(error);
      }
    });

    //console.log(videoUrlInput.val());

    return false;
  },

  'change input[type="file"]': function (event) {
    renderVideo(event.target.files[0]);
  },

  'change .convert-form__video-url': function (event) {
    var url = event.target.value;

    Meteor.call('saveDeo', url, function(error, result) {
      if (!error) {
        var mp4Link = result.data.formats[1].url;
        Session.set('videoPreviewSource', mp4Link);
        console.log(mp4Link);
        return console.log(result);
      }
    });
  }

});


var renderVideo = function (file){
  var reader = new FileReader();

  reader.onload = function(event){
    Session.set('videoPreviewSource', event.target.result);
  }

  reader.readAsDataURL(file);
}


var humanFileSize = function (bytes, si) {
  var thresh = si ? 1000 : 1024;
  if(bytes < thresh) return bytes + ' B';
  var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
  var u = -1;
  do {
      bytes /= thresh;
      ++u;
  } while(bytes >= thresh);
  return bytes.toFixed(1)+' '+units[u];
}
