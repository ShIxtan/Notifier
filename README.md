### About

Demo notification/chat system for use in Virtual reality settings. The idea was to make as hands-free and non-intrusive as possible. It consists of four small windows, all of which can be hidden with voice commands, or moved wherever you want on screen. By default, only notifications are visible, but message history, friends list, and controls are easy to bring up.

This project was built in rails, with backbone.js as the frontend. It uses websockets for realtime updates and tracking who's online. Voice controls use HTML5 speech recognition.

### controls

-Press ctrl + A to toggle alerts on/off
-Press ctrl + C to toggle controls on/off
-Press ctrl + F to toggle friends on/off
-Press ctrl + M to toggle messages on/off
-Press ctrl + U to change username

## Voice
-"Hide controls" or "Hide all"
-"Show messages" or "Show all"
-"Change Username to xyz"
-"Send Message xyz"

Also, all panes can be drag-and-dropped anywhere on the screen.

### Issues and to-do
-[ ] Takes some time for voice commands to process, visual feedback that this is happening would be good.
-[ ] Some invalid commands don't raise errors. saying "Hide whatever" for example.
-[ ] Sometimes fails to remove users when browser is closed.
-[ ] Would be nice if a refresh didn't reset user.
-[ ] Some sort of authentication might be good.
