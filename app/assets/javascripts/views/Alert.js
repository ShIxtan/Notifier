Notifier.Views.Alert = Backbone.CompositeView.extend({
  template: JST['Alert'],

  initialize: function(){
    this.queue = [];
  },

  render: function(){
    if (this.queue.length > 0){
      this.$el.html(this.template({content: this.queue.shift()}));
      $('.alert').show("Slide");

      if (this.queue.length > 0){
        setTimeout(function(){$(".alert").hide()}, 6900);
        this.renderIn(7000);
      }
    }
    return this
  },

  addToQueue: function(string){
    if (this.queue.length < 1){
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
