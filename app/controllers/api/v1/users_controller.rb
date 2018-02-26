class Api::V1::UsersController < Api::ApplicationController

  def create
    @user = User.new user_params
    if @user.save
      render json: {
        jwt: encode_token({
            id: @user.id,
            first_name: @user.first_name,
            last_name: @user.last_name,
            full_name: @user.full_name,
            email: @user.email
          })
      }
    else
      head :bad_request
    end
  end

  private
  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end

  def encode_token(payload = {}, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i #changes expiration date to datetime
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

end
