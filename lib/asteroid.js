(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(game, position) {
    this.radius = Asteroid.RADIUS;
    this.color = Asteroid.COLOR;
    this.velocity = Asteroids.Util.randomVec(5);
    Asteroids.MovingObject.call(this, position, this.velocity, this.radius, this.color, game);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.RADIUS = 40;

  Asteroid.COLOR = "#8B3A3A";

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      this.game.lives -= 1;
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

  Asteroid.prototype.breakIntoTwo = function(game, pos) {
    for (var i = 0; i < 3; i++) {
      var asteroid = new Asteroids.Asteroid(game, pos)
      asteroid.radius = this.radius / 2
      game.asteroids.push(asteroid);
      game.allMovingObjects.push(asteroid);
    }
  };

})();
