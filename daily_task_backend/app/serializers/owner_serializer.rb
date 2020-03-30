class OwnerSerializer < ActiveModel::Serializer
  has_many :users
  attributes :id, :subdomain, :user_name, :email, :admin

end
