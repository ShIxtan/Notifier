# == Schema Information
#
# Table name: messages
#
#  id          :integer          not null, primary key
#  content     :text
#  reciever_id :integer
#  sender_id   :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Message < ActiveRecord::Base
  validates :content, :reciever_id, :sender_id, presence: true

  belongs_to(
    :sender,
    class_name: 'User',
    foreign_key: :sender_id,
    primary_key: :id
  )

  belongs_to(
    :reciever,
    class_name: 'User',
    foreign_key: :reciever_id,
    primary_key: :id
  )


end
