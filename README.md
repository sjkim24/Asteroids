# Asteroids
[Live Link](https://www.sjkim.io/Asteroids)

This is an asteroids game made with JavaScript and HTML canvas.

I used [keymaster](https://github.com/madrobby/keymaster) to move and rotate the ship.

## Asteroids & Bullets
These two moving objects are drawn using canvas's arc function.

## Ship
Unlike asteriods and bullets, I used basic trigonometry to inscribe a triangle in a circle to draw my ship. The triangle is formed by connecting 3 points on the circumference of the circle.

## Movement
I used my up/down arrow keys to make the ship to accelerate and decelerate and left/right to change the orientation of the ship by 15 degrees, using trigonometry, with each press.

## Collision
Two objects detect collision by calculating the distance between their center points. I use the distance formula where x<sub>1</sub> and y<sub>1</sub> is the x and y coordinates of the first object and x<sub>2</sub> and y<sub>2</sub> is the x and y coordinates of the second object.

# Future Features

## Initial Invincibility
When the ship collides with an asteroids, it respawns at a random position. If an asteroid happens to be moving on that position it destroys the ship right away. To prevent, I want to give the ship invincibility for 3 seconds when it spawns.
