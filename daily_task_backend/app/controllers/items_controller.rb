class ItemsController < ApplicationController

    def index
        item = Item.all 
        render json: item, status: 200
    end


    def update
        item = Item.find(params[:id])
        item.recipe['ingredients'] << {ingredientName: params[:ingredientItem]}
        owner_items = Owner.find_by(id: params[:owner_id])
        if item.save
            # render json: item, status: :ok
            render json: owner_items.to_json(:include => {
                :users => {:only => [:id, :first_name, :last_name, :email]},
                :feeds => {:only => [:id, :comment]},
                :items => {:only => [:id, :recipe]}
              }, :except => [:updated_at, :created_at, :password_digest])
        else
            render json: {errors: item.errors.full_messages}, status: 404
        end
    end


    def create
        item = Item.create(recipe: {task_name: params[:recipe],ingredients: []}, owner_id: params[:owner_id])
         owner_items = Owner.find_by(id: params[:owner_id])
        if item.valid?
        render json: owner_items.to_json(:include => {
            :users => {:only => [:id, :first_name, :last_name, :email]},
            :feeds => {:only => [:id, :comment]},
            :items => {:only => [:id, :recipe]}
          }, :except => [:updated_at, :created_at, :password_digest])

        else
            render json: {errors: item.errors.full_messages}, status: 404
        end
    end



end
