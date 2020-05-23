class MessagesController < ApplicationController

    def index
        messages = Message.all
        render json: messages, status: 200
    end

    def create
        message = Message.create(filter_params)
        if message.valid?
            ActionCable.server.broadcast("ChatChannel", message)
            render json: message, status: 300 
        else 
            render json: {error: message.errors.full_messages}
        end
    end

    private

    def filter_params
        params.require(:message).permit(:content, :user_id, :chat_id)
    end
end
