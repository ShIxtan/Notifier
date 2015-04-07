class SocketController < WebsocketRails::BaseController
  def initialize_session
  end

  def new_message
    if message[:content]
      m = Message.create(message)
      broadcast_message :new_message, message
    end
  end

  def change_username
    if message[:username]
      current_username = connection_store[:user].username
      if connection_store[:user].update_attributes username: message[:username]
        new_message = "#{current_username} is now #{message[:username]}"
        broadcast_message :new_message, new_message
        broadcast_message :update_user, {username: message[:username], id: connection_store[:user].id}
      end
    end
  end

  def client_connected
    @user = User.generate
    connection_store[:user] = @user
    new_message = "#{@user.username} has entered the room"
    broadcast_message :new_message, new_message
    brodcast_message :new_user, {username: @user.username, id: @user.id}
    @user.messages.each do |m|
      send_message :new_message, {content: m.content}
    end
  end

  def client_disconnected
    @user = connection_store[:user]
    new_message = "#{@user.username} has left the room"
    broadcast_message :new_message, new_message
    broadcast_message :destroy_user, {username: @user.username, id: @user.id}
    @user.destroy
  end
end
