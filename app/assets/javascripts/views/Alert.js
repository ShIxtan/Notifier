Notifier.Views.Alert = Backbone.CompositeView.extend({
  template: JST['Alert'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    this.$el.html(this.template({content: this.model.content}));
    return this
  }
})
