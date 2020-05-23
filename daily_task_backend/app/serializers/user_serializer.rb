class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :tasksId
  belongs_to :owner
  has_many :messages
  
end
