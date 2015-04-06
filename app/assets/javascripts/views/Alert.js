Notifier.Views.Alert = Backbone.CompositeView.extend({
  template: JST['Alert'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.updateQueue.bind(this));
    this.queue = [];
  },

  render: function(){
    this.$el.html(this.template({content: this.queue.shift()}));
    if (this.queue){
      this.renderIn(5000)
    }
    return this
  },

  updateQueue: function(){
    this.addToQueue(this.model.content);
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
