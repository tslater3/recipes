class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.text :description
      t.string :meal
      t.string :category
      t.boolean :is_quick
      t.boolean :is_healthy
      t.string :cooking_style
      t.string :ethnicity
      t.string :meat

      t.timestamps
    end
  end
end
