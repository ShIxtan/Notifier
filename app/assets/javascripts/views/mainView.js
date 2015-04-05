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
    this.alert = this.alert || new Notifier.Views.Alert();
    this.addSubview(".alert", this.alert);
  },

  showMessages: function(){
    this.messages = this.messages || new Notifier.Views.Messages();
    this.addSubview(".messages", this.messages);
  },

  showControls: function(){
    this.controls = this.controls || new Notifier.Views.Controls();
    this.addSubview(".controls", this.controls);
  },

  showFriends: function(){
    this.friends = this.friends || new Notifier.Views.Friends();
    this.addSubview(".friends", this.friends);
  }
})
