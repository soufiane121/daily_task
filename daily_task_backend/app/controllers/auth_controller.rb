require 'byebug'
class AuthController < ApplicationController


  
    def login
       @owner = Owner.find_by(email: params[:email])
        if @owner && @owner.authenticate(params[:password])
            session[:@owner_id] = @owner.id
            tokenn = encode_token(@owner.id)
            render json: {owner: OwnerSerializer.new(@owner), token: tokenn}
        else
            render json: {errors: "Email or password incorrect."}
        end
    end

    def auto_login  
        owner = Owner.find_by(id: decoded_token)
        if owner
            render json: {owner: OwnerSerializer.new(owner)}
        else
            render json: {errors: "User not found. Please login again. "}
        end
    end
  
    
  end

