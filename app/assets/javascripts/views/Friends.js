Notifier.Views.Friends = Backbone.CompositeView.extend({
  template: JST['Friends'],

  render: function(){
    this.$el.html(this.template());
    return this
  }
})
