class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.sender_id = current_user.id

    if @message.save
      render json: message
    else
      flash.now[:errors] = @message.errors.full_messages
      render json: {}
    end
  end

  def index
    @messages = current_user.messages
    render json: @messages
  end

  def show
    @message = current_user.next_message
    current_user.touch
    puts current_user.updated_at
    render json: @message
  end

  private

  def message_params
    params.require(:message).permit(:reciever_id, :content)
  end
end
