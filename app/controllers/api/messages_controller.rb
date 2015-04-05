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
    if params[:message_ids]
      until params[:message_ids].frequency != current_user.message_ids.frequency
      end
    end
    @messages = current_user.messages
    render :index
  end

  private

  def message_params
    params.require(:message).permit(:reciever_id, :content)
  end
end