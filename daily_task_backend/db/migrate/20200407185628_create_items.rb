class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.jsonb :recipe, default: '{}'
      t.integer :owner_id

      t.timestamps
    end
  end
end
