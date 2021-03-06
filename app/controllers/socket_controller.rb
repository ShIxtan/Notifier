class SocketController < WebsocketRails::BaseController
  def initialize_session
  end

  def new_message
    if message[:content]
      message[:content] = "#{connection_store[:user].username}: #{message[:content]}"
      broadcast_message :new_message, message
    end
  end

  def change_username
    if message[:username]
      current_username = connection_store[:user].username
      if connection_store[:user].update_attributes username: message[:username]
        new_message = {content: "#{current_username} is now #{message[:username]}"}
        broadcast_message :new_message, new_message
        broadcast_message :update_user, {username: message[:username], id: connection_store[:user].id}
      end
    end
  end

  def client_connected
    @user = User.generate
    connection_store[:user] = @user
    new_message = {content: "#{@user.username} has entered the room"}
    broadcast_message :new_message, new_message
    broadcast_message :new_user, {username: @user.username, id: @user.id}
    @user.messages.reverse.each do |m|
      send_message :new_message, {content: m.content}
    end
    User.all.each do |user|
      send_message :new_user, {username: user.username, id: user.id}
    end
  end

  def client_disconnected
    @user = connection_store[:user]
    new_message = {content: "#{@user.username} has left the room"}
    broadcast_message :new_message, new_message
    broadcast_message :destroy_user, {username: @user.username, id: @user.id}
    @user.destroy
  end
end
