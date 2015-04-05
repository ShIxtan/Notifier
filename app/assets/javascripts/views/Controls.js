Notifier.Views.Controls = Backbone.CompositeView.extend({
  template: JST['Controls'],

  render: function(){
    this.$el.html(this.template());
    return this
  }
})
