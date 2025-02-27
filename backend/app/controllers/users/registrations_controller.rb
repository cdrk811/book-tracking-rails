# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if request.method == 'POST'
      if resource.persisted?
        render_success_json(
          ActiveModelSerializers::SerializableResource.new(resource, each_serializer: UserSerializer),
          {}, 'Signed up successfully.'
        )
      else
        render json: {
          status: { code: 422, message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }
        }, status: :unprocessable_entity
      end
    elsif request.method == 'DELETE'
      if resource.destroy
        render_success_json(
          ActiveModelSerializers::SerializableResource.new(resource, each_serializer: UserSerializer),
          {}, 'Account deleted successfully.'
        )
      else
        render json: { status: 422, message: "Account could not be deleted." }, status: :unprocessable_entity
      end
    else
      render json: {
        status: { code: 422, message: "Invalid request." }
      }, status: :unprocessable_entity
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
