# frozen_string_literal: true

class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :book_image, :author_avatar, :author_name, :pages,
             :categories, :status, :user_id, :updated_at

  def updated_at
    object.updated_at.strftime('%Y-%m-%d %H:%M:%S')
  end

  def categories
    object.categories.pluck(:name)
  end

  def status
    object.status
  end
end