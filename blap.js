
if (Meteor.isClient) {

  Template.formUpload.helpers({
    counter: function () {

    }
  });

  Template.formUpload.events({
    'submit .form-converter': function (event) {


    },

    'change input[type="file"]': function (event) {

    }

  });
}


function humanFileSize(bytes, si) {
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


function renderVideo(file){
  var reader = new FileReader();
  reader.onload = function(event){
    the_url = event.target.result
    $('#data-vid').html("<video width='400' controls><source id='vid-source' src='"+the_url+"' type='video/mp4'></video>")
     $('#name-vid').html(file.name)
    $('#size-vid').html(humanFileSize(file.size, "MB"))
    $('#type-vid').html(file.type)

  }

  reader.readAsDataURL(file);
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
