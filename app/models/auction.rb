class Auction < ApplicationRecord

  default_scope { order(created_at: :desc) }
  
  has_many :bids, dependent: :destroy
  has_many :bidders, through: :bids, source: :user #not really essential

  belongs_to :user

  validates :title, presence: true
  validates :reserve_price, presence: true
  validates :end_date, presence: true
end
