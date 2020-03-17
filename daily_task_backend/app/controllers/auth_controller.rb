class AuthController < ApplicationController
  
    def login
       owner = Owner.find_by(user_name: params[:user_name])

        if owner && owner.authenticate(params[:password])
            token = encode_token(owner.id)
            render json: {user: owner, token: token}
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
  