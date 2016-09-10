Rails.application.routes.draw do

  devise_for :users

  namespace :dashboard do
    root to: 'dashboard#index'
  end

  namespace :api, :defaults => { :format => :json }, path: '/' do
    resources :recipes
  end

end
