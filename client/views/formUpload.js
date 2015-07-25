Session.setDefault('buttonLoadingClass', false);

Template.formUpload.helpers({
  videoPreviewSource: function () {
    return Session.get('videoPreviewSource');
  },

  jibSourceUrl: function () {
    return Session.get('jibSourceUrl');
  },

  jibId: function () {
    return Session.get('jibId');
  },

  buttonLoadingClass: function () {
    var isUploading = Session.get('buttonLoadingClass');

    if(isUploading) {
      return 'button--loading'
    } else {
      return '';
    }
  },

  currentPath: function () {
    return Iron.Location.get().rootUrl;
  }
});

Template.formUpload.events({
  'click .form-converter__reset': function (event) {
    Session.set('videoPreviewSource', '');
    $('.file-inputs').show();
    return false;
  },

  'submit .form-converter': function (event) {
    event.preventDefault();

    var file;
    var response;
    var $form = $(event.target);
    var videoUrlInput = $form.find('.convert-form__video-url');
    var trimFrom = $form.find('.convert-form__trim-from').val() || '0';
    var trimTo = $form.find('.convert-form__trim-to').val() || '0';

    if (!videoUrlInput.val()) {
      file = $form.find('.convert-form__input-file')[0].files;
    } else {
      file = Session.get('videoPreviewSource');
    }

    Session.set('buttonLoadingClass', true);

    Cloudinary.upload(file, {
      folder: "secret",
      resource_type: "video",
    }, function(err, res) {
      if (err) {
        console.log(JSON.parse(JSON.stringify(err)));
        Session.set('buttonLoadingClass', false);
      } else {
        console.log(JSON.parse(JSON.stringify(res)));
        response = res;

        var jibSourceUrl = 'http://res.cloudinary.com/jib/video/upload/eo_' + trimTo + ',so_' + trimFrom + '/v1437694626/' + response.public_id + '.mp3';
        Session.set('jibSourceUrl', jibSourceUrl);

        var newJib = Jibs.insert({
          url: jibSourceUrl
        });

        Session.set('jibId', newJib);
        Session.set('buttonLoadingClass', false);
      }
    });
  },

  'change input[type="file"]': function () {
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
