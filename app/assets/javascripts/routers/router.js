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
      var commands = {
        'show messages': this._mainView.showMessages.bind(this._mainView),
        'show alerts': this._mainView.showAlert.bind(this._mainView),
        'show controls': this._mainView.showControls.bind(this._mainView),
        'show friends': this._mainView.showFriends.bind(this._mainView),
        'hide messages': this._mainView.hideMessages.bind(this._mainView),
        'hide alerts': this._mainView.hideAlert.bind(this._mainView),
        'hide controls': this._mainView.hideControls.bind(this._mainView),
        'hide friends': this._mainView.hideFriends.bind(this._mainView),
        'hide all': this._mainView.hideAll.bind(this._mainView),
        'show all': this._mainView.showAll.bind(this._mainView),
        'change username': this._mainView.showUsername.bind(this._mainView),
      };

      // Add our commands to annyang
      annyang.addCommands(commands);
      annyang.addCallback('resultNoMatch', this._mainView.dontUnderstand.bind(this._mainView));

      // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start();
    }

    var dispatcher = new WebSocketRails('localhost:3000/websocket');
    dispatcher.bind("new_message", this._mainView.newMessage.bind(this._mainView));
    dispatcher.bind("update_user", this._mainView.updateUser.bind(this._mainView));
    dispatcher.bind("new_user", this._mainView.newUser.bind(this._mainView));
    dispatcher.bind("destroy_user", this._mainView.destroyUser.bind(this._mainView));

    $(".username").on("submit", function(event){
      event.preventDefault();
      var message = {username: $('.username input').val()};
      dispatcher.trigger('change_username', message);
    })
  }
})
