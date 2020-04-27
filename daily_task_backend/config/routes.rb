Rails.application.routes.draw do
  
  post "/login", to: "auth#login"
  get "/owner_auto_login", to: "auth#auto_login"
  post '/user_login', to: 'authi#login'
  get "/user_auto_login", to: "authi#auto_login"
  patch '/items_updat/:id', to: 'items#updating'
  patch '/assigning_user/:id', to: 'items#assigning_user'
  post '/assigning_ids/', to: 'users#assigning_ids'
  patch '/items_update_from_user/:id', to: 'items#items_update_from_user'

  resources :items
  resources :feeds
  resources :users
  resources :owners
end
