if (Meteor.isClient) {

  Template.formUpload.helpers({
    counter: function () {

    }
  });

  Template.formUpload.events({
    'submit .form-converter': function (event) {


    }
  });
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
