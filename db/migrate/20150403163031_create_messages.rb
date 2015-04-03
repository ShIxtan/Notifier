class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :content
      t.integer :reciever_id, index: true
      t.integer :sender_id, index: true

      t.timestamps null: false
    end
  end
end
