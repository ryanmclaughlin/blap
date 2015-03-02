
Template.formUpload.helpers({

});

Template.formUpload.events({
  'submit .form-converter': function (event) {
  },

  'change input[type="file"]': function (event) {
    renderVideo(event.target.files[0]);
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
