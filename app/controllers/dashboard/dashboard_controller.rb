module Dashboard
  class DashboardController < ApplicationController
    def index
      render "front_end/dashboard/index", :layout => "full_application"
    end
  end
end
