class OwnerSerializer < ActiveModel::Serializer
  has_many :users
  has_many :feeds
  has_many :items
  attributes :id, :subdomain, :user_name, :email, :admin

end
