Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
  template: 'index'
});

Router.route('/jib/:_id', {
    template: 'jib',
    data: function(){
      var currentBlap = this.params._id;
      return Blaps.findOne({ _id: currentBlap });
    }
});
