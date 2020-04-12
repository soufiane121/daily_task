Rails.application.routes.draw do
  
  post "/login", to: "auth#login"
  get "/owner_auto_login", to: "auth#auto_login"
  post '/user_login', to: 'authi#login'
  get "/user_auto_login", to: "authi#auto_login"


  resources :items
  resources :feeds
  resources :users
  resources :owners
end
