Notifier.Models.Message = Backbone.Model.extend({
  urlRoot: "api/messages",

  initialize: function(){
    this.fetch();
  }
});
