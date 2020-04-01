class FeedsController < ApplicationController

    def index
        @feed = Feed.all
        render json: @feed, status: 200
    end

    def create
        feed = Feed.create(filtered_params)
        if feed.valid?
            render json: {feed: FeedSerializer.new(feed)}, status: :created
        else
            render json: {errors: feed.erros.full_messages }, status: 500
        end
    end

    private 


    def filtered_params
        params.require(:feed).permit(:comment, :owner_id)
    end

end
