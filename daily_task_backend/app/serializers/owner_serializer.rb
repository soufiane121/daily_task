class OwnerSerializer < ActiveModel::Serializer
  attributes :id, :subdomain, :user_name, :email, :admin
end
