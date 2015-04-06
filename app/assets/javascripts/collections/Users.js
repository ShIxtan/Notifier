Notifier.Collections.Users = Backbone.Collection.extend({
  url: "api/users",
  model: Notifier.Models.User,

  initialize: function(){
    this.listenTo(this, "sync", this.check.bind(this))
    this.fetch();
  },

  check: function(){
    var that = this
    setTimeout(function(){
      that.fetch();
    }, 5000)
  }
});
