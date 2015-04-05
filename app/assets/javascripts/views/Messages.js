Notifier.Views.Messages = Backbone.CompositeView.extend({
  template: JST['Messages'],

  render: function(){
    this.$el.html(this.template());
    return this
  }
})
