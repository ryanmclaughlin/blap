
var videoDuration;
var videoStartTime = 0;
var videoEndTime = 5;

Session.setDefault('videoPreviewSource', false);
Session.setDefault('videoStartTime', videoStartTime);
Session.setDefault('videoEndTime', videoEndTime);


// Template.videoPreview.rendered = function () {
// };

function updateVideoCurrentTime (value) {
  var $this = $(this);
  $this.val(formatTrimTime(value));

  $('.video').get(0).currentTime = value;

  if ($this.hasClass('convert-form__trim-from')) {
    Session.set('videoStartTime', value);
  } else {
    Session.set('videoEndTime', value);
  }
}

function formatTrimTime(s) {
  var time = 0;

  if (s > 60) {
    var m = Math.floor(s / 60);
    s -= m * 60;

    time = m + ':' + (s < 10 ? '0' + s : s);
  } else {
    time = s;
  }

  return time;
}


var initSlider = function () {
  var slider = $('.slider');

  slider.noUiSlider({
    start: [videoStartTime, videoEndTime],
    connect: true,
    range: {
      'min': 0,
      'max': videoDuration
    }
  });

  slider.Link('lower').to($('.convert-form__trim-from'), updateVideoCurrentTime, wNumb({
    decimals: 1
  }));

  slider.Link('upper').to($('.convert-form__trim-to'), updateVideoCurrentTime, wNumb({
    decimals: 1
  }));
};


Template.videoPreview.events({
  'loadedmetadata video': function (event) {
    var video = event.target;
    // Round to two decimal places
    videoDuration = Math.floor(video.duration * 100) / 100;
    initSlider();
  },

  'mouseover video': function (event) {
    var video = event.target;
    video.setAttribute('controls', 'controls');
  },

  'mouseout video': function (event) {
    var video = event.target;
    video.removeAttribute('controls')
  },

  'timeupdate video': function (event) {
    var video = event.target;
    if (!video.paused && video.currentTime >= Session.get('videoEndTime')) {
      video.currentTime = Session.get('videoStartTime');
    }
  }

});

Template.videoPreview.helpers({
  videoPreviewSource: function () {
    return Session.get('videoPreviewSource');
  }
});
