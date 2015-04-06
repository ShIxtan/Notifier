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
  before_destroy :say_goodby
  after_update :new_name
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

    self.current_message = message.id if message
    self.save

    message ? message : {content: ""}
  end

  def self.generate
    name = "guest#{rand(99999)}"
    user = self.create(username: name)
    return user
  end

  def add_messages
    User.all.each do |user|
      next if user.id == self.id
      user.messages.create({content: "#{self.username} has entered the room", sender_id: self.id})
    end
    self.messages.create({content: "hi", sender_id: self.id})
    self.messages.create({content: "this is your second message", sender_id: self.id})
  end

  def say_goodby
    User.all.each do |user|
      next if user.id == self.id
      user.messages.create({content: "#{self.username} has left the room", sender_id: self.id})
    end
  end

  def new_name
    if self.username_changed?
      User.all.each do |user|
        next if user.id == self.id
        user.messages.create({content: "#{self.username} has a new name", sender_id: self.id})
      end
    end
  end
end
