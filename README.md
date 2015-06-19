# Asteroids
[Live Link](https://www.sjkim.io/Asteroids)

This is an asteroids game made with JavaScript and HTML canvas.

I used [keymaster](https://github.com/madrobby/keymaster) to move and rotate the ship.

## Ship
Unlike asteriods and bullets, I used basic trigonometry to inscribe a triangle in a circle to draw my ship. The triangle is formed by connecting 3 points on the circumference of the circle.

## Movement
I used my up/down arrow keys to make the ship to accelerate and decelerate and left/right to change the orientation of the ship by 15 degrees, using trigonometry, with each press.

# Future Features

## Initial Invincibility
When the ship collides with an asteroids, it respawns at a random position. If an asteroid happens to be moving on that position it destroys the ship right away. To prevent, I want to give the ship invincibility for 3 seconds when it spawns.
