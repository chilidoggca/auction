class AddIsAdminToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :is_admin, :boolean, null: false, default: false
    add_reference :users, :user, foreign_key: true
  end
end
