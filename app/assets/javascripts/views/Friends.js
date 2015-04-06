Notifier.Views.Friends = Backbone.CompositeView.extend({
  template: JST['Friends'],

  initialize: function(){
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function(){
    this.$el.html(this.template({friends: this.collection}));
    return this;
  }
})
