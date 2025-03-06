# frozen_string_literal: true

class Book < ApplicationRecord
  belongs_to :user
  has_many :book_categories
  has_many :categories, through: :book_categories

  enum status: { pending: 0, in_progress: 1, finished: 2 }

  validates :title, :description, :book_image, :author_avatar, :author_name, :pages, presence: true
end