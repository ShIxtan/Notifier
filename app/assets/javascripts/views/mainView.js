Notifier.Views.MainView = Backbone.CompositeView.extend({
  template: JST['mainView'],

  render: function(){
    this.$el.html(this.template())
    this.showAlert();
    this.showMessages();
    this.showControls();
    this.showFriends();
    return this;
  },

  showAlert: function(){
    this.alert = this.alert || new Notifier.Views.Alert({model: this.message()});
    this.addSubview(".alert", this.alert);
  },

  showMessages: function(){
    this.message_history = this.message_history || new Notifier.Views.Messages({collection: this.messages()});
    this.addSubview(".messages", this.message_history);
  },

  showControls: function(){
    this.controls = this.controls || new Notifier.Views.Controls();
    this.addSubview(".controls", this.controls);
  },

  showFriends: function(){
    this.friends = this.friends || new Notifier.Views.Friends({collection: this.users()});
    this.addSubview(".friends", this.friends);
  },

  message: function(){
    if (!this._message){
      this._message = new Notifier.Models.Message();
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
  }
})
