require 'byebug'
class AuthiController < ApplicationController

def login
    user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            token = user_encode_token(user.id)
            render json: {user: UserSerializer.new(user), token: token}
        else
            render json: {errors: "Email or password incorrect."}
        end
end

def auto_login  
    user = User.find_by(id: user_decoded_token)
    if user
        # render json: {user: UserSerializer.new(user)}
        render json: {user: UserSerializer.new(user)}

    else
        render json: {errors: "User not found. Please login again. "}
    end
end


end