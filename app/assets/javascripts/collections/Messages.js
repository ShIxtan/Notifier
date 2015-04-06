Notifier.Collections.Messages = Backbone.Collection.extend({
  url: "api/messages",
  model: Notifier.Models.Message,

  initialize: function(){
    this.listenTo(this, "sync", this.check.bind(this))
    this.fetch();
  },

  check: function(){
    var that = this
    setTimeout(function(){
      this.fetch();
    }, 30000)
  }
});
