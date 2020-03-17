class OwnerSerializer < ActiveModel::Serializer
  attributes :id, :company, :user_name, :email
end
