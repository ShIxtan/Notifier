Notifier.Models.Alert = Backbone.Model.extend({
  urlRoot: "api/messages",

  initialize: function(){
    this.set("id", 0);
    this.listenTo(this, "sync", this.check.bind(this));
    this.fetch();
  },

  check: function(){
    var that = this
    setTimeout(function(){
      that.fetch();
    }, 3000)
  }
});
