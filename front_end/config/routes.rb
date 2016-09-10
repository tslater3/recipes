FrontEnd::Engine.routes.draw do
  get '*all' => 'dashboard/dashboard#index'
end
