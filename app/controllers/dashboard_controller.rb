class DashboardController < ApplicationController
  def index
    render "index", :layout => "full_application"
  end
end
