# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render_success_json(
      ActiveModelSerializers::SerializableResource.new(resource, each_serializer: UserSerializer),
      {}, 'Logged in sucessfully.'
    )
  end

  def respond_to_on_destroy
    if current_user
      render json: { status: 200, message: "Logged out successfully" }, status: :ok
    else
      render json: { status: 401, message: "Couldn't find an active session." }, status: :unauthorized
    end
  end

  def render_success_json(data, payload = {}, message)
    response = {
      status: 200,
      success: true,
      message: message,
      data: data
    }.merge(payload)

    render json: response
  end
end
