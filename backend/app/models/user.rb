class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :books

  before_validation :normalize_username

  validates :username, uniqueness: { case_sensitive: false }, allow_nil: true

  private

  def normalize_username
    self.username = nil if username.blank?
  end
end
