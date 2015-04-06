Notifier.Models.Message = Backbone.Model.extend({
  urlRoot: "api/messages",

  initialize: function(){
    this.listenTo(this, "sync", this.fetch.bind(this))
    this.fetch();
  }
});
