Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :create, :destroy]
    resources :messages, only: [:index, :create]
  end
end
