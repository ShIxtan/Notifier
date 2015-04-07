Notifier.Views.Username = Backbone.CompositeView.extend({
  template: JST['Username'],

  render: function(){
    this.$el.html(this.template());
    return this
  }
})
