Notifier.Views.MainView = Backbone.CompositeView.extend({
  template: JST['mainView'],

  initialize: function(){
    _.bindAll(this, 'onKeydown');
    $(document).bind('keydown', this.onKeydown);
  },

  render: function(){
    this.$el.html(this.template())
    this.addSubviews();
    this.afterRender();
    return this;
  },

  events: {
    "submit .name": "updateUsername"
  },

  addSubviews: function(){
    this.alert = new Notifier.Views.Alert();
    this.addSubview(".alert", this.alert);

    this.message_history = new Notifier.Views.Messages({collection: this.messages()});
    this.addSubview(".messages", this.message_history);

    this.controls = new Notifier.Views.Controls();
    this.addSubview(".controls", this.controls);

    this.friends = new Notifier.Views.Friends({collection: this.users()});
    this.addSubview(".friends", this.friends);

    this.username = new Notifier.Views.Username();
    this.addSubview(".username", this.username);
  },

  showBox: function(box){
    $("." + box).fadeIn();
    $(".name input").focus();
  },

  showAll: function(){
    this.showBox("friends");
    this.showBox("controls");
    this.showBox("messages");
  },

  hideBox: function(box){
    $("." + box).fadeOut();
  },

  hideAll: function(){
    this.hideBox("alert");
    this.hideBox("messages");
    this.hideBox("controls");
    this.hideBox("friends");
    this.hideBox("username");
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

  afterRender: function(){
    var that = this
    setTimeout(function(){
      $('.box').draggable({ handle: "h3" });
      that.setupVoiceControls();
      that.setupSockets();
    },0)
  },

  updateUsername: function(event){
    event.preventDefault();
    var message = $('.username input').val();
    this.updateName(message);
  },

  updateName: function(name){
    this.dispatcher.trigger('change_username', {username: name});
    this.hideBox("username");
  },

  setupVoiceControls: function(){
    if (annyang) {
      var commands = {
        'hide all': this.hideAll.bind(this),
        'show all': this.showAll.bind(this),
        'show *term': this.showBox.bind(this),
        'hide *term': this.hideBox.bind(this),
        'change username': this.showBox.bind(this, "username"),
        'change username to *term': this.updateName.bind(this),
        'send message *term': this.sendMessage.bind(this)
      };

      annyang.addCommands(commands);
      annyang.addCallback('resultNoMatch', this.dontUnderstand.bind(this));

      annyang.start();
    }
  },

  dontUnderstand: function(){
    this.alert.addToQueue("I'm sorry, I didn't catch that. Try Again?");
  },

  setupSockets: function(){
    this.dispatcher = new WebSocketRails('localhost:3000/websocket');

    this.dispatcher.bind("new_message", this.newMessage.bind(this));
    this.dispatcher.bind("update_user", this.updateUser.bind(this));
    this.dispatcher.bind("new_user", this.newUser.bind(this));
    this.dispatcher.bind("destroy_user", this.destroyUser.bind(this));
  },

  updateUser: function(new_user) {
    var user = this.users().findWhere({id: new_user.id})
    user.set("username", new_user.username)
  },

  newMessage: function(message){
    this.alert.addToQueue(message.content);
    this.messages().add(message);
  },

  newUser: function(new_user){
    this.users().add(new_user);
  },

  destroyUser: function(new_user){
    var user = this.users().findWhere({id: new_user.id});
    this.users().remove(user);
  },

  sendMessage: function(text){
    this.dispatcher.trigger("message.send", {content: text})
  }
})
