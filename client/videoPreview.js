Session.setDefault('videoPreviewSource', false);

Template.videoPreview.rendered = function () {

  $('.slider').noUiSlider({
    start: [0, 20],
    connect: true,
    range: {
      'min': 0,
      'max': 100
    }
  });

  $(".slider").on({
    slide: function (event){
      //console.log(event)
    }
  });

};

Template.videoPreview.events({
  'loadedmetadata video': function (event) {
    var video = event.target;
    var videoDuration = video.duration;
    console.log(videoDuration);
  }
});

Template.videoPreview.helpers({
  videoPreviewSource: function () {
    return Session.get('videoPreviewSource');
  }

});
