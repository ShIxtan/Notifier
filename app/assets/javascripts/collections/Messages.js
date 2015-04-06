Notifier.Collections.Messages = Backbone.Collection.extend({
  url: "api/messages",
  model: Notifier.Models.Message,

  initialize: function(){
    this.listenTo(this, "sync", this.fetch.bind(this))
    this.fetch();
  }
});
