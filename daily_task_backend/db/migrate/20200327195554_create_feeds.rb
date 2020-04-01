class CreateFeeds < ActiveRecord::Migration[5.2]
  def change
    create_table :feeds do |t|
      t.string :comment
      t.integer :owner_id
      t.timestamps
    end
  end
end
