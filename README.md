### Plan
This is just for planning. So, my first thought is to make a notifications system. This would be for things like letting the user know someone else has just entered the room, or one of their friends is online, or someone has sent them a message, that sort of thing. Could also be used for a tutorial on startup, or to give instructions when the user approaches the chess set or something. As far as I know, this sort of thing isn't in the demos I've done.

So I'm thinking a very minimalistic and modular HUD that has a space for notifications, probably in the upper right.
It's relatively easy to access your friends list in altspaceVR, but it might be nice if doing so didn't require opening up the menu and limiting movement. So I'd like to make that a removable pard of the HUD. Two more things come to mind as useful, but not something you'd want all the time. A message history, and a list of controls.

The issue is, even if these are pretty small and translucent, they might still feel wrong in some situations. Nobody likes things hovering in their peripheral vision all the time. So ideally, it's very easy to add/remove. I'm thinking of three possibilities. First, keybindings would work fine if you're not wearing a headset, or are very good at touch typing, but probably aren't practical most of the time. The mouse I used did have multiple buttons that I don't think were being used, so using one or two of those might be okay, but probably not ideal, as there are still lots of features that can be added.

So I think I want to try adding voice control. It's a feature available in current browsers, and the commands could be very simple. "show/hide messages", "show/hide friends", and "show/hide controls" would be enough.

So I think I know what I want to do.

I've got 4 backbone views:
- message
- message_list
- users
- controls

2 backbone collections/models
- users
- messages

on the Rails side, I need 2 models.
- User
  - username
- Message
 - user_id
 - sender_id
 - content

I need API routes for
- users
  - index (should be a long poll that sends down the current list and loops until it changes)
  - create
  - destroy (for logging off, I'll just destroy the user)
- messages
  - index (should be a long poll that sends down the current list and loops until it changes, will only return those belonging to current_user, either as sender or reciever)
  - create

No auth is needed for this, I'll just not let people sign in with the same name
I could do websockets instead of the long pulls. The fact that I don't know how is one thing preventing me, the other is that a long pull seems simpler to implement. (might not be true, I should look into it.) Looking into sockets, they don't look too bad, but I think I'll stick with a long pull for now. Maybe I'll also auto-destroy a user if they go a minute without the long pull loops running.

the whole display should be thought of as a module that exposes the following api to other javascript code:

- HUD.showMessages
- HUD.hideMessages
- HUD.showControls
- HUD.hideControls
- HUD.showUsers
- HUD.hideUsers
- HUD.showAlerts
- HUD.hideAlerts
- HUD.sendMessage(username, content)
- HUD.login(username)
- HUD.logout

I'll call these from a different module that will handle controls from keybindings, and hopefully voice control.

This feels doable in 5 hours time, so I'll plan on 10.
