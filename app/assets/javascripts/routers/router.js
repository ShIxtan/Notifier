Notifier.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl
  },

  routes: {
    "": "mainView"
  },

  mainView: function(){
    this._mainView = new Notifier.Views.MainView();
    this.$rootEl.html(this._mainView.render().$el);

    if (annyang) {
      // Let's define our first command. First the text we expect, and then the function it should call
      var commands = {
        'show messages': this._mainView.showMessages.bind(this._mainView),
        'show alerts': this._mainView.showAlert.bind(this._mainView),
        'show controls': this._mainView.showControls.bind(this._mainView),
        'show friends': this._mainView.showFriends.bind(this._mainView),
        'hide messages': this._mainView.hideMessages.bind(this._mainView),
        'hide alerts': this._mainView.hideAlert.bind(this._mainView),
        'hide controls': this._mainView.hideControls.bind(this._mainView),
        'hide friends': this._mainView.hideFriends.bind(this._mainView),
      };

      // Add our commands to annyang
      annyang.addCommands(commands);
      annyang.addCallback('resultNoMatch', this._mainView.dontUnderstand.bind(this._mainView));

      // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start();
    }
  }
})
