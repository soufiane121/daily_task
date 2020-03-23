Rails.application.routes.draw do
  
  resources :users
  resources :owners
  post "/login", to: "auth#login"
  get "/owner_auto_login", to: "auth#auto_login"
  post '/user_login', to: 'authi#login'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
