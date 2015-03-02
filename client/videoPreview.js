Session.setDefault('videoPreviewSource', false);

Template.videoPreview.helpers({
  videoPreviewSource: function () {
    return Session.get('videoPreviewSource');
  }
});