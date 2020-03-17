class Owner < ApplicationRecord
    validates :first_name, :last_name, :user_name, :company, presence: true
    validates :user_name, :company, uniqueness: true
    validates :password_digest, length: { minimum: 3 }

    has_secure_password

    after_create :create_tenante



    private 

    def create_tenante
        Apartment::Tenant.create(company)
    end
end
