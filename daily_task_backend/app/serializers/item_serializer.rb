class ItemSerializer < ActiveModel::Serializer
  attributes :id, :recipe
  belongs_to :owner
end
