# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  # include JSONAPI::Serializer
  attributes :id, :email, :created_at, :jti, :username
end