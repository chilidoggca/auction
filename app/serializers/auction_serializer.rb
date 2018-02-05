class AuctionSerializer < ActiveModel::Serializer
  attributes :id, :title, :details, :end_date, :reserve_price

  belongs_to :user, key: :auction_owner
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :full_name
  end

  has_many :bids
  class BidSerializer < ActiveModel::Serializer
    attributes :id, :bid_price, :created_at, :updated_at, :bidder_full_name

    def bidder_full_name
      object.user&.full_name
    end
  end

end
