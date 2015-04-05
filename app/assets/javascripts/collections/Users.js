Notifier.Collections.Users = Backbone.Collection.extend({
  url: "api/users",
  model: Notifier.Models.User,

  initialize: function(){
    this.fetch();
  }
});
