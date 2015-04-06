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
  after_create :add_messages
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

  def next_message
    if self.current_message
      message = self.messages.find_by("id > #{current_message}")
    else
      message = self.messages.first
    end

    return {} if self.current_message == message.id
    self.current_message = message.id
    self.save

    message
  end

  def self.generate
    name = "guest#{rand(99999)}"
    user = self.create(username: name)
    return user
  end

  def add_messages
    self.messages.create({content: "hi", sender_id: self.id})
    self.messages.create({content: "this is your second message", sender_id: self.id})
  end
end
