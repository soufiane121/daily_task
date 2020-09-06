class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users, status: 200
    end


    def show
        user = User.find_by(id: params[:id])
        render json: user, status: 300
    end

    def create
        owner = Owner.all.find {|ele| ele.subdomain == params[:company]}
        @user = User.new(first_name: params[:first_name], last_name: params[:last_name], email: params[:email], owner_id: owner.id)
        @user.password = params[:password]
        if @user.save
            session[:user_id] = @user.id 
            token = user_encode_token(@user.id)
            render json: { user: UserSerializer.new(@user), token: token }, status: :created
        else 
            render json: {errors: @user.errors.full_messages}, status: 500
        end
    end

    def assigning_ids
        user = User.find_by(id: params[:id])
        user[:tasksId] << {"taskId"=> params[:taskId], "ingredientIdx"=> params[:ingredientIdx]}
        user[:tasksId].uniq!
        if user.save
            # render json: { user: UserSerializer.new(@user)}, status: :ok
            render json: user, status: :ok
        else
            render json: {errors: @user.errors.full_messages}, status: 500
        end
    end

    def destroy
        user = User.find_by(id: params[:id])
        user.destroy
        render json: user
    end

    private

    def filtered_params
        params.require(:user).permit(:first_name, :last_name, :company, :email)
    end

end
