class Api::UsersController < ApplicationController
  def create

    @user = current_user
    @user.username = params[:username]

    if @user.save
      render json: @user
      session[:username] = @user.username
    else
      flash.now[:errors] = @user.errors.full_messages
      render json: {}
    end
  end

  def destroy
    current_user.destroy()
    session[:username] = nil
    render json: {}
  end

  def index
    User.where("updated_at < ?", 10.seconds.ago).destroy_all
    render json: User.all
  end
end
