class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.text :username, unique: true, index: true

      t.timestamps null: false
    end
  end
end
