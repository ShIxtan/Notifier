class AddCurrentMessageToUsers < ActiveRecord::Migration
  def change
    add_column :users, :current_message, :integer
  end
end
