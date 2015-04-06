class PagesController < ApplicationController
  def show
    current_user
    render :show
  end
end
