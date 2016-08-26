Rails.application.routes.draw do
  TEMPORARY_REDIRECT = 307

  devise_for :users
  root :to => redirect('/recipes', :status => TEMPORARY_REDIRECT)

  namespace :api, :defaults => { :format => :json }, path: '/' do
    resources :recipes
  end
end
