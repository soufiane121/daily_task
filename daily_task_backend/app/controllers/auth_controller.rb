require 'byebug'
class AuthController < ApplicationController


  
    def login
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
        id =request.headers["Authorization"]
        owner = Owner.find_by(id: id.to_i)
        if owner
            render json: {owner: OwnerSerializer.new(owner)}
        else
            render json: {errors: "User not found. Please login again. "}
        end
    end
  
    
  end

