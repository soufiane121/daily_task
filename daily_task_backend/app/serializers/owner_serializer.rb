class OwnerSerializer < ActiveModel::Serializer
  has_many :users
  has_many :feeds
  attributes :id, :subdomain, :user_name, :email, :admin

end
