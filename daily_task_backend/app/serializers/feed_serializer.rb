class FeedSerializer < ActiveModel::Serializer
  attributes :id, :comment
  belongs_to :owner
end
