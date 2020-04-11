class ItemsController < ApplicationController

    def index
        item = Item.all 
        render json: item, status: 200
    end


    def create
        # item.recipe.merge!(new_key: 'please work')
        item = Item.create(recipe: {task_name: params[:recipe]}, owner_id: params[:owner_id])

        if item.valid?
            render json: {items: ItemSerializer.new(item)}, status: 300
        else
            render json: {errors: item.errors.full_messages}, status: 404
        end
    end


end
