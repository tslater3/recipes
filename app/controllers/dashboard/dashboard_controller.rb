module Dashboard
  class DashboardController < ApplicationController
    def index
      render "front_end/dashboard/index", :layout => "front_end/application"
    end
  end
end
