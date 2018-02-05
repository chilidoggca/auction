Rails.application.routes.draw do

  # namespace :api, defaults: {format: :json} do
  #   namespace :v1 do
  #     resources :auctions, only: [:index, :show, :create, :destroy]
  #     resources :tokens, only: [:create]
  #   end
  #   match '*unmatched_route', to: 'application#not_found', via: :all
  # end

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :index, :show]

  resources :auctions do
    resources :bids, only: [:create, :destroy], shallow: true
  end

  get('/', { to: 'auctions#index', as: :home })

end
