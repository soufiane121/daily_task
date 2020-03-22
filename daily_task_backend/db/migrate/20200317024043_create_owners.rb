class CreateOwners < ActiveRecord::Migration[5.2]
  def change
    create_table :owners do |t|
      t.string :first_name
      t.string :last_name
      t.string :user_name
      t.string :password_digest
      t.string :subdomain
      t.string :email
      t.boolean :admin, default: true

      t.timestamps
    end
  end
end
