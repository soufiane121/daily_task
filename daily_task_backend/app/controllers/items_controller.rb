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
            render json: owner_items.to_json(:include => {
                :users => {:only => [:id, :first_name, :last_name, :email]},
                :feeds => {:only => [:id, :comment]},
                :items => {:only => [:id, :recipe]}
              }, :except => [:updated_at, :created_at, :password_digest])
        else
            render json: {errors: item.errors.full_messages}, status: 404
        end
    end

    def updating
        owner_items = Owner.find_by(id: params[:owner_id])
        item = Item.find_by(id: params[:id])
        item_id = params[:itemId]
        hash_item =item.recipe["ingredients"][item_id]
        final_hashing = hash_item.merge!({"status"=> params[:status], "quantity"=> params[:quantity], "dateTime"=> params[:dateTime]})
        if item.save  
            render json: owner_items.to_json(:include => {
                :users => {:only => [:id, :first_name, :last_name, :email]},
                :feeds => {:only => [:id, :comment]},
                :items => {:only => [:id, :recipe]}
              }, :except => [:updated_at, :created_at, :password_digest])
        else
        render json: {errors: item.errors.full_messages}, status: 404 
        byebug       
        end
    end

    def assigning_user
        owner_items = Owner.find_by(id: params[:owner_id])
        item = Item.find_by(id: params[:id])
        itemT = item.recipe.merge!({'userId'=> params[:user_id]})
        itemR= itemT['ingredients'][params[:itemId]]
        itemR.merge!({'first_name'=> params[:userInfo][:firstName], 'last_name'=> params[:userInfo][:lastName]})

        if item.save
            render json: owner_items.to_json(:include => {
                :users => {:only => [:id, :first_name, :last_name, :email]},
                :feeds => {:only => [:id, :comment]},
                :items => {:only => [:id, :recipe]}
              }, :except => [:updated_at, :created_at, :password_digest])
        else
        render json: {errors: item.errors.full_messages}, status: 404 
        end

    end


    def items_update_from_user
        owner_items = Owner.find_by(id: params[:owner_id])
        item = Item.find_by(id: params[:id])
        spesific_item = item.recipe["ingredients"].find {|ele| ele['ingredientName'] == params['ingredientName'] }
        spesific_item.merge!({"status"=> params[:status], "quantity"=> params[:quantity], "dateTime"=> params[:dateTime]})

        if item.save  
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
