window.Notifier = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Notifier.Routers.Router({$rootEl: $('body')})
    Backbone.history.start()
  }
};
