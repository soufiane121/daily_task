require 'byebug'
class AuthiController < ApplicationController

def login
    user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            token = encode_token(user.id)
            render json: {User: UserSerializer.new(user), token: token}
        else
            render json: {errors: "Username or password incorrect."}
        end
end

def auto_login  
    id =request.headers["Authorization"]
    user = User.find_by(id: id.to_i)
    if user
        render json: {user: UserSerializer.new(user)}
    else
        render json: {errors: "User not found. Please login again. "}
    end
end


end