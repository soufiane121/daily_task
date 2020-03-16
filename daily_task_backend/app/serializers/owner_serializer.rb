class OwnerSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :first_name, :last_name, :company_name, :email
end
