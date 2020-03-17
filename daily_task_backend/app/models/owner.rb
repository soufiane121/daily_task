class Owner < ApplicationRecord
    validates :first_name, :last_name, :user_name, :company, :email, presence: true
    validates :user_name, :company, :email, uniqueness: true
    validates :password_digest, length: { minimum: 3 }
    has_secure_password
    after_create :create_tenante

    def password=(arg)
        self.password_digest = BCrypt::Password.create(arg)
    end

    private 

    def create_tenante
        Apartment::Tenant.create(company)
    end
end
