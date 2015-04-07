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
  after_create: new_user_messages
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

  def new_user_messages
    self.messages.create({content: "Hi! Welcome to the room!"})
    self.messages.create({content: "You have keyboard and voice controls."})
    self.messages.create({content: "To see keyboard controls, press ctrl + C"})
    self.messages.create({content: "To use voice controls, make sure to allow ^"})
    self.messages.create({content: "Try saying 'show all', 'send message hello', or 'change username to skywalker'"})
  end
end
