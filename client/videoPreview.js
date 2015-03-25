Session.setDefault('videoPreviewSource', false);

Template.videoPreview.rendered = function () {

  $('.slider').noUiSlider({
    start: [20, 80],
    connect: true,
    range: {
      'min': 0,
      'max': 100
    }
  });

};

Template.videoPreview.helpers({
  videoPreviewSource: function () {
    return Session.get('videoPreviewSource');
  }
});
