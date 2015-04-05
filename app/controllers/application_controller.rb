class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    if session[:username]
      user = User.find_by(username: session[:username])
    end

    unless user
      user = User.generate()
      session[:username] = user.username
    end

    return user
  end
end
