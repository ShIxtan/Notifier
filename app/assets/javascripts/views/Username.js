Notifier.Views.Username = Backbone.CompositeView.extend({
  template: JST['Username'],

  events: {
    "submit": "submitUsername"
  },

  render: function(){
    this.$el.html(this.template());
    return this
  },

  submitUsername: function(event){
    event.preventDefault();
    user = new Notifier.Models.User({'username': $('input').val()})
    user.save();
    $(".username").fadeOut();
  }
})
