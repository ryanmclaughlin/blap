Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
  template: 'index'
});

Router.route('/blap/:_id', {
    template: 'blap',
    data: function(){
      var currentBlap = this.params._id;
      return Blaps.findOne({ _id: currentBlap });
    }
});
