Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :books, except: [:destroy]
    end
  end
end
