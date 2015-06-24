
Template.formUpload.helpers({
  videoPreviewSource: function () {
    return Session.get('videoPreviewSource');
  }
});

Template.formUpload.events({
  'click .form-converter__reset': function (event) {
    Session.set('videoPreviewSource', '');
    $('.file-inputs').show();
    return false;
  },

  // 'submit .form-converter': function (event) {
  //   var $form = $(event.target);
  //   var videoUrlInput = $form.find('.convert-form__video-url');
  //   var input = 'download';
  //   var inputformat = 'mp4';
  //   var outputformat = 'mp3';
  //   var trimFrom = $form.find('.convert-form__trim-from').val() || '0';
  //   var trimTo = $form.find('.convert-form__trim-to').val() || '0';

  //   if (!videoUrlInput.val()) {
  //     input = 'upload';
  //     file = $form.find('.convert-form__input-file').files[0];
  //   } else {
  //     file = Session.get('videoPreviewSource');
  //   }

  //   var params = {
  //     'input': input,
  //     'inputformat': inputformat,
  //     'outputformat': outputformat,
  //     'file': file,
  //     'download': 'inline',
  //     'converteroptions[trim_from]': trimFrom,
  //     'converteroptions[trim_to]': trimTo,
  //     'save': true
  //   };


  //   console.log(params);

  //   Meteor.call('cloudConvert', params, function(error, result) {
  //     if (!error) {
  //       console.log(result)
  //     } else {
  //       console.log(error);
  //     }
  //   });

  //   return false;
  // },

  'change input[type="file"]': function (event) {
    renderVideo(event.target.files[0]);
    $('.file-inputs').hide();
  },

  'change .convert-form__video-url': function (event) {
    var url = event.target.value;
    var extension = url.substr((~-url.lastIndexOf(".") >>> 0) + 2);
    var extensionList = ['mp4', 'avi', 'mpeg', 'wmv', 'mov'];

    if (extensionList.indexOf(extension) > -1) {
        Session.set('videoPreviewSource', url);
    } else {
      Meteor.call('saveDeo', url, function(error, result) {
        if (!error) {
          url = result.data.formats[1].url;
          Session.set('videoPreviewSource', url);
          return console.log(result);
        }
      });
    }
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
