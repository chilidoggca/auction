class Api::V1::AuctionsController < Api::ApplicationController
  before_action :authenticate_user!
  before_action :find_auction, only: [:update, :show, :destroy]
  before_action :authorize_user!, only: [:update, :destroy]
  def index
    @auctions = Auction.order(created_at: :desc)
    render json: Auction.all
  end

  def show
    render json: @auction
  end

  def create
    auction = Auction.new(auction_params)
    auction.user = current_user

    auction.save!
    render json: {id: auction.id}
  end

  def update
    if @auction.update(auction_params)
      render json: {id: @auction.id}
    else
      head :bad_request
    end
  end

  def destroy
    if @auction.destroy
      render json: Auction.all, status: 200
    else
      head :bad_request
    end
  end

  private
  def find_auction
    @auction = Auction.find params[:id]
  end

  def auction_params
    params.require(:auction).permit(:title, :details, :reserve_price, :end_date)
  end

  def authorize_user!
    unless can?(:crud, @auction)
      head :bad_request
    end
  end
end
