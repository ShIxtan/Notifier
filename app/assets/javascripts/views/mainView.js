Notifier.Views.MainView = Backbone.CompositeView.extend({
  template: JST['mainView'],

  initialize: function(){
    _.bindAll(this, 'onKeydown');
    $(document).bind('keydown', this.onKeydown);
  },

  render: function(){
    this.$el.html(this.template())
    this.showAlert();
    this.showMessages();
    this.showControls();
    this.showFriends();
    return this;
  },

  showAlert: function(){
    if (this.alert) {
      $(".alert").show()
    } else {
      this.alert = new Notifier.Views.Alert({model: this.message()});
      this.addSubview(".alert", this.alert);
    }
  },

  showMessages: function(){
    if (this.message_history) {
      $(".messages").show()
    } else {
      this.message_history = new Notifier.Views.Messages({collection: this.messages()});
      this.addSubview(".messages", this.message_history);
    }
  },

  showControls: function(){
    if (this.controls) {
      $(".controls").show()
    } else {
      this.controls = new Notifier.Views.Controls();
      this.addSubview(".controls", this.controls);
    }
  },

  showFriends: function(){
    if (this.friends) {
      $(".friends").show()
    } else {
      this.friends = new Notifier.Views.Friends({collection: this.users()});
      this.addSubview(".friends", this.friends);
    }
  },

  hideAlert: function(){
    $(".alert").hide();
  },

  hideMessages: function(){
    $(".messages").hide();
  },

  hideControls: function(){
    $(".controls").hide();
  },

  hideFriends: function(){
    $(".friends").hide();
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
        $(".alert").toggle();
        break;
      case 77:
        $(".messages").toggle();
        break;
      case 67:
        $(".controls").toggle();
        break;
      case 70:
        $(".friends").toggle();
        break;
    }
  }
})
