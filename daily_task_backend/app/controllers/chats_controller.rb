class ChatsController < ApplicationController


    def create
        chat = Chat.find_or_create_by(name: params[:name])
        render json: chat, status: 200
    end



end
