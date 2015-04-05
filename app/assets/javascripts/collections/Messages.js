Notifier.Collections.Messages = Backbone.Collection.extend({
  url: "api/messages",
  model: Notifier.Models.Message
});
