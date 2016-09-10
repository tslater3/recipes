Rails.application.routes.draw do
  mount FrontEnd::Engine => "/front_end"
end
