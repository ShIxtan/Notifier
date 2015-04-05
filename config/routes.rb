Rails.application.routes.draw do
  root to: 'pages#show'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :create, :destroy]
    resources :messages, only: [:index, :create]
  end
end
