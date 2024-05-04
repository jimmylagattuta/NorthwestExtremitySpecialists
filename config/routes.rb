Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :notes, only: [:index]
      get "/me", to: "users#show"
      post "/signup", to: "users#create"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      get "/pull_google_places_cache", to: "jobs#pull_google_places_cache"
      post '/send-email', to: 'email#send_email'
    end
  end

  # Existing catch-all for HTML GET requests
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  # New catch-all for all other requests
  match "*path", to: "fallback#all", via: :all
end
