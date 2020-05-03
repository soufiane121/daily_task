class User < ApplicationRecord
    belongs_to :owner
    has_many :messages
    has_many :chats, through: :messages
    # attribute :variables, :variable_array, default: []
    validates :first_name, :last_name, :email, presence: true
    validates :email, uniqueness: true
    validates :password_digest, length: { minimum: 2}
    has_secure_password



    def password=(arg)
        self.password_digest = BCrypt::Password.create(arg)
    end


end
