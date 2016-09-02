class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :meal, :cooktime, :category, :is_quick, :is_healthy, :cooking_style, :ethnicity, :meat
end
