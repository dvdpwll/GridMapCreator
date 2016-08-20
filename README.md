#GridMapCreator

I'll be making a tabletop make creator. It's a grid that you can fill with things
like trees, monsters, and buildings. This is designed to help the person who is
planning the adventure (dungeon master) create and plan the maps the players
will be using.

In this project I will have made a website and server to create and save DnD
maps. I'll use HTML, JavaScript, Bootstrap, Ruby, and Ruby on Rails.

Link to site: kjfldas;jfkldsajkl.com

Technologies: HTML, SCSS, JS, JQUERY, AJAX, RUBY, RUBY ON RAILS

In addition to the default user table, I will be making a Maps table and a
Elements table. The Maps table will have a One-To-Many relationship with User,
and Elements will have a One-To-Many relationship with Maps.
Maps:
-id: serial primary key
-map_name: string
-user_id: reference
Elements:
-id: serial primary key
-thing: string
-order: integer
-map_id: reference

Devolopment:
-Create the wireframe.
  -Start off with a grid of 5x5, go to 10x10 eventually.
-Create the database using rails
  -Make a user(rails makes this)
  -Make a maps table
-Create ajax for user
-Create logic for clicking on the grid
-Create ajax for maps
-Include graphics for grid (trees, rocks, grass)
-Clean up code and make pretty

Thing to change in the future:
-Search for other people's maps
-Rate other people's maps
-Include a dropdown selector for types for terrain
  -grass
  -sand
  -cave
  -buildings
  -monsters
-Convert to a pdf so that you can print it.
  -(maybe you don't have to convert to pdf to make it printable.)
-Variable map sizes
  -Independently variable lengths and widths
-Generate a random map
***Taz's Comments**
-update map name upon loading a map
-maybe also show map ID on page
-under Load Maps popup, add note about going to List All Maps
-add error/confirm messag for passsword change errors
-New Map field shows previous map name; should clear each time
-Delete Map -- ask to confirm deleting map; then show status message
-Delete Map -- reset/clear board and change name to default

Wireframes: https://wireframe.cc/trdNcg

User Stories:
-As a user I want to save my maps so that I can come back to it later.
-As a user I want lots of options for things to put on my board.
-As a user I want name my maps
-As a user I want to see all of my maps
-As an admin I want to only prevent others from accessing other people's maps.
-As an admin I want to remove a user.
-As an admin I want users to be able to change their password.
-As an admin I want the SPA to communicate to a server.
