Notifier.Models.Message = Backbone.Model.extend({
  urlRoot: "api/messages",

  initialize: function(){
    this.listenTo(this, "sync", this.check.bind(this))
    this.fetch();
  },

  check: function(){
    var that = this
    setTimeout(function(){
      that.fetch();
    }, 30000)
  }
});
