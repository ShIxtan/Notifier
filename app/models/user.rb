# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  username   :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ActiveRecord::Base
  validates :username, presence: true, uniqueness: true

  has_many(
    :messages,
    class_name: 'Message',
    foreign_key: :reciever_id,
    primary_key: :id
  )

  has_many(
    :sent_messages,
    class_name: 'Message',
    foreign_key: :sender_id,
    primary_key: :id
  )

  def self.generate
    name = "guest#{rand(99999)}"
    user = self.create(username: name)
    return user
  end
end
