Rails.application.routes.draw do

  devise_for :users
  root to: 'api/recipes#index'

  namespace :api, :defaults => { :format => :json }, path: '/' do
    resources :recipes
  end
end
