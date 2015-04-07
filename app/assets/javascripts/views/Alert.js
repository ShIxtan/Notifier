Notifier.Views.Alert = Backbone.CompositeView.extend({
  template: JST['Alert'],

  initialize: function(){
    this.listenTo(this.model, "sync change", this.updateQueue.bind(this));
    this.queue = [];

  },

  render: function(){
    if (this.queue.length > 0){
      this.$el.html(this.template({content: this.queue.shift()}));
      $('.alert').fadeIn();

      if (this.queue.length > 0){
        this.renderIn(5000);
      }

      setTimeout(function(){$(".alert").fadeOut()}, 4900);
    } else {
      setTimeout(function(){$(".alert").hide()}, 0);
    }
    return this
  },

  updateQueue: function(){
    this.addToQueue(this.model.get("content"));
  },

  addToQueue: function(string){
    if (!this.queue){
      this.renderIn(0);
    }

    this.queue.push(string);
  },

  renderIn: function(time){
    var that = this
    setTimeout(function(){
      that.render()
    }, time)
  }
})
