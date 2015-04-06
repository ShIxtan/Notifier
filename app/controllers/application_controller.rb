class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    if session[:username]
      user = User.find_by(username: session[:username])
    end

    user ||= User.generate()
    session[:username] = user.username

    return user
  end

  def logout
    current_user.destroy
    session[:username] = nil
  end
end
