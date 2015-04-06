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
      this.alert = new Notifier.Views.Alert({model: this.message()});
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
      $(".username").fadeIn()
    } else {
      this.username = new Notifier.Views.Username();
      this.addSubview(".username", this.username);
    }
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

  message: function(){
    if (!this._message){
      this._message = new Notifier.Models.Alert();
    }

    return this._message;
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
    }
  }
})
