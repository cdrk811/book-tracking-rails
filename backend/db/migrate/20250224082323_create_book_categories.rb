class CreateBookCategories < ActiveRecord::Migration[7.1]
  def change
    create_table :book_categories do |t|
      t.references :book, index: true, foreign_key: true
      t.references :category, index: true, foreign_key: true
      t.timestamps
    end
  end
end
