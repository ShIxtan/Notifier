Notifier.Views.Messages = Backbone.CompositeView.extend({
  template: JST['Messages'],

  initialize: function(){
    this.listenTo(this.collection, "change add remove", this.render);
  },

  render: function(){
    this.$el.html(this.template({messages: this.collection}));
    return this
  }
})
