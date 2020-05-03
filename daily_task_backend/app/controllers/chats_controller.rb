class ChatsController < ApplicationController


    def create
        chat = Chat.find_or_create_by(name: params[:name])
        render json: chat,
    end



end
