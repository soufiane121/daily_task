require 'byebug'
class OwnersController < ApplicationController

    def index
        owners = Owner.all
        render json: owners, status: 200
    end

    def create
        @owner = Owner.create(filtered_params)
        # debugger
        if @owner.valid?
            token = encode_token(@owner.id)
            render json: { owner: OwnerSerializer.new(@owner) }, status: :created
        else 
            render json: {errors: @owner.errors.full_messages}, status: :not_created
        end
    end


private

    def filtered_params
        params.require(:owner).permit(:first_name, :last_name, :user_name, :company, :email, :password_digest)
    end
end
