class BidsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_auction, only: [:create]
  before_action :find_bid, only: [:destroy]
  before_action :authorize_user!, only: [:destroy]
  def create
    @bid = Bid.new(bid_params)
    @bid.user = current_user
    @bid.auction = @auction
    if can?(:bid, @bid.auction)
      if @bid.save
        redirect_to @auction, notice: 'Your bid was successful!'
      else
        @bids = @auction.bids.order(created_at: :desc)
        redirect_to @auction, alert: 'Your bid was unsuccessful.'
      end
    else
      @bids = @auction.bids.order(created_at: :desc)
      redirect_to @auction, alert: 'You could not bid.'
    end

  end

  def destroy
    @bid.destroy
    redirect_to @bid.auction
  end

  private

  def bid_params
    params.require(:bid).permit(:bid_price)
  end

  def find_auction
    @auction = Auction.find params[:auction_id]
  end

  def find_bid
    @bid = Bid.find params[:id]
  end

  def authorize_user!
    unless can?(:crud, @bid)
      flash[:alert] = "Access Denied."
      redirect_to home_path
    end
  end
end
