module Api
  class RecipesController < ApplicationController
    before_action :authenticate_user!

    def new
    end

    def create
    end

    def index
      @recipes = Recipe.all
      render json: @recipes
    end

    def show
    end

    def edit
    end

    def update
    end

    def destroy
    end
  end
end
