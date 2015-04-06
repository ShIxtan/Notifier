class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

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
    if session[:user_ids]
      until session[:user_ids].frequency != User.pluck(:id).frequency
        sleep(1)
      end
    end
    session[:user_ids] = User.pluck(:id)
    render json: User.all
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
