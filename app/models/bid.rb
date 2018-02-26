class Bid < ApplicationRecord

  default_scope { order(created_at: :desc) }

  belongs_to :user
  belongs_to :auction

  validates :bid_price, presence: true
end
