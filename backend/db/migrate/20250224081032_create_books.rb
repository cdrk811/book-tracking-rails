class CreateBooks < ActiveRecord::Migration[7.1]
  def change
    create_table :books do |t|
      t.string :title
      t.text :description
      t.string :book_image
      t.string :author_avatar
      t.string :author_name
      t.string :pages
      t.integer :status, default: 0
      t.timestamps
    end
  end
end
