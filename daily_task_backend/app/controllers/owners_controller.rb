require 'byebug'
class OwnersController < ApplicationController

    def index
        owners = Owner.all
        render json: owners, status: 200
    end


    def show
        # byebug
        @owner = Owner.find(params[:id])
        render json: {owner: OwnerSerializer.new(@owner)}
    end


    def create
        @owner = Owner.new(filtered_params)
        @owner.password = params[:password]
        if @owner.save
            session[:owner_id] = @owner.id 
            tokenn= encode_token(@owner.id)
            render json: { owner: OwnerSerializer.new(@owner), token: tokenn }, status: :created
        else 
            render json: {errors: @owner.errors.full_messages}, status: 500
        end
    end


private

    def filtered_params
        params.require(:owner).permit(:first_name, :last_name, :user_name, :subdomain, :email)
    end
    
end
