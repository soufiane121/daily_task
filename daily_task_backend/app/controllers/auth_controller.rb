require 'byebug'
class AuthController < ApplicationController


  
    def login
        # debugger
       @owner = Owner.find_by(email: params[:email])
        if @owner && @owner.authenticate(params[:password])
            session[:@owner_id] = @owner.id
            token = encode_token(@owner.id)
            render json: {owner: OwnerSerializer.new(@owner), token: token}
        else
            render json: {errors: "Username or password incorrect."}
        end
    end

    def auto_login   
        if session_user
            render json: {user: session_user}
        else
            render json: {errors: "User not found. Please login again. "}
        end
    end
  
    
  end
  