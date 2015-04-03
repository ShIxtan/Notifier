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
  validates :username, presence: true, uniqeness: true

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
end
