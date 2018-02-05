class AuctionsController < ApplicationController
  before_action :authenticate_user!, except: [:show, :index]
  before_action :find_auction, only: [:show, :edit, :update, :destroy]
  before_action :authorize_user!, only: [:edit, :update, :destroy]

  def new
    @auction = Auction.new
  end

  def index
    @auctions = Auction.all.order(created_at: :desc)
    respond_to do |format|
      format.html { render }
      format.json { render json: @auctions }
      format.xml { render xml: @auctions }
    end

  end

  def create
    @auction = Auction.new auction_params
    @auction.user = current_user
    if @auction.save
      redirect_to @auction
    else
      render :new
    end
  end

  def show
    @bids = @auction.bids.order(created_at: :desc)
    @bid = Bid.new
  end

  def edit
  end

  def update
    if @auction.update(auction_params)
      redirect_to auction_path(@auction)
    else
      render :edit
    end
  end

  def destroy
    @auction.destroy
    redirect_to auctions_path
  end


  private

  def auction_params
    params.require(:auction).permit(:title, :details, :end_date, :reserve_price)
  end

  def find_auction
    @auction = Auction.find params[:id]
  end

  def authorize_user!
    unless can?(:crud, @auction)
      flash[:alert] = "Access Denied!"
      redirect_to home_path
    end
  end

end
