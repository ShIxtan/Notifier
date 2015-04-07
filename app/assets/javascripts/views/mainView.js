Notifier.Views.MainView = Backbone.CompositeView.extend({
  template: JST['mainView'],

  initialize: function(){
    _.bindAll(this, 'onKeydown');
    $(document).bind('keydown', this.onKeydown);
  },

  render: function(){
    this.$el.html(this.template())
    this.showFriends();
    this.showAlert();
    this.showMessages();
    this.showControls();
    this.showUsername();
    return this;
  },

  showAlert: function(){
    if (this.alert) {
      $(".alert").fadeIn()
    } else {
      this.alert = new Notifier.Views.Alert();
      this.addSubview(".alert", this.alert);
    }
  },

  showMessages: function(){
    if (this.message_history) {
      $(".messages").fadeIn()
    } else {
      this.message_history = new Notifier.Views.Messages({collection: this.messages()});
      this.addSubview(".messages", this.message_history);
    }
  },

  showControls: function(){
    if (this.controls) {
      $(".controls").fadeIn()
    } else {
      this.controls = new Notifier.Views.Controls();
      this.addSubview(".controls", this.controls);
    }
  },

  showFriends: function(){
    if (this.friends) {
      $(".friends").fadeIn()
    } else {
      this.friends = new Notifier.Views.Friends({collection: this.users()});
      this.addSubview(".friends", this.friends);
    }
  },

  showUsername: function(){
    if (this.username) {
      $(".username").fadeIn();
    } else {
      this.username = new Notifier.Views.Username();
      this.addSubview(".username", this.username);
    }
  },

  showAll: function(){
    this.showAlert();
    this.showFriends();
    this.showControls();
    this.showMessages();
  },

  hideAlert: function(){
    $(".alert").fadeOut();
  },

  hideMessages: function(){
    $(".messages").fadeOut();
  },

  hideControls: function(){
    $(".controls").fadeOut();
  },

  hideFriends: function(){
    $(".friends").fadeOut();
  },

  hideUsername: function(){
    $(".username").fadeOut();
  },

  hideAll: function(){
    this.hideAlert();
    this.hideMessages();
    this.hideControls();
    this.hideFriends();
    this.hideUsername();
  },

  messages: function(){
    if (!this._messages){
      this._messages = new Notifier.Collections.Messages();
    }

    return this._messages;
  },

  users: function(){
    if (!this._users){
      this._users = new Notifier.Collections.Users();
    }

    return this._users;
  },

  onKeydown: function(e){
    if (e.ctrlKey){
      switch (e.keyCode){
        case 65:
          $(".alert").fadeToggle();
          break;
        case 77:
          $(".messages").fadeToggle();
          break;
        case 67:
          $(".controls").fadeToggle();
          break;
        case 70:
          $(".friends").fadeToggle();
          break;
        case 85:
          $(".username").fadeToggle();
          $(".name input").focus();
      }
    }
  },

  dontUnderstand: function(){
    this.alert.addToQueue("I'm sorry, I didn't catch that. Try Again?");
  },

  updateUser: function(new_user) {
    var user = this.users().findWhere({id: new_user.id})
    user.set("username", new_user.username)
  },

  newMessage: function(message){
    this.alert.addToQueue(message);
    this.messages().add({content: message});
  },

  newUser: function(new_user){
    this.users().add(new_user);
  },

  destroyUser: function(new_user){
    var user = this.users().findWhere({id: new_user.id});
    this.users().remove(user);
  }
})
