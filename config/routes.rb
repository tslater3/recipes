Rails.application.routes.draw do

  devise_for :users
  root to: 'dashboard#index'

  namespace :api, :defaults => { :format => :json }, path: '/' do
    resources :recipes
  end
end
