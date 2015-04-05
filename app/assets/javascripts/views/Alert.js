Notifier.Views.Alert = Backbone.CompositeView.extend({
  template: JST['Alert'],

  render: function(){
    this.$el.html(this.template());
    return this
  }
})
