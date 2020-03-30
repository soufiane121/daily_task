class FeedsController < ApplicationController

    def index
        feed = Feed.all
        render :json feed, status: 200
    end

    def create
        byebug
    end
end
