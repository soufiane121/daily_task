class FeedsController < ApplicationController

    def index
        @feed = Feed.all
        render json: @feed, status: 200
    end

    def show
        @feed = Feed.find(params[:id])
        render json: @feed, status: :ok
    end

    def edit
        @feed = Feed.find(params[:id])
        render json: @feed, status: :ok
    end

    def create
        feed = Feed.create(filtered_params)
        if feed.valid?
            render json: {feed: FeedSerializer.new(feed)}, status: :created
        else
            render json: {errors: feed.errors.full_messages }, status: 500
        end
    end

    def update
        @feed = Feed.find(params[:id])
        @feed.update(comment: params[:comment])
        if @feed.save
            render json: @feed, status: 200
        else 
            render json: {errors: @feed.errors.full_messages}, status: 400
        end
    end


    def destroy
        @feed = Feed.find(params[:id])
        @feed.destroy
        render json: @feed, status: :done
    end

    private 


    def filtered_params
        params.require(:feed).permit(:comment, :owner_id)
    end

end
