class Ability
  include CanCan::Ability

  def initialize(user)
    #
    #   user ||= User.new # guest user (not logged in)
    if user.is_admin?
      can :manage, :all
    else
      can :read, :all
    end

    alias_action :create, :read, :update, :destroy, :to => :crud

    can :crud, Auction do |auction|
      user == auction.user
    end

    can :crud, Bid do |bid|
      bid.user == user
    end

    can :bid, Auction do |auction|
      auction.user != user
    end

  end
end
