class ItemsController < ApplicationController

    def index
        item = Item.all 
        render json: item, status: 200
    end

    def create
        # item.recipe.merge!(new_key: 'please work')
        # byebug
        item = Item.create(recipe: {task_name: params[:recipe]}, owner_id: params[:owner_id])
         owner_items = Owner.find_by(id: params[:owner_id])
        if item.valid?
            # render json: {item: ItemSerializer.new(item), owner_id: params[:owner_id]}, status: 300
            # render json: item, owner_id: params[:owner_id]
        # render json: {owner: OwnerSerializer.new(item)}
        render json: owner_items.to_json(:include => {
            # :owner => {:only => [:id, :subdomain, :email, :user_name, :admin]},
            :users => {:only => [:id, :first_name, :last_name, :email]},
            :feeds => {:only => [:id, :comment]},
            :items => {:only => [:id, :recipe]}
          }, :except => [:updated_at, :created_at, :password_digest])

        else
            render json: {errors: item.errors.full_messages}, status: 404
        end
    end



end
