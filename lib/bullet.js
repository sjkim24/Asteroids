(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (position, velocity, game, orientation) {
    this.radius = Bullet.RADIUS;
    this.color = Bullet.COLOR;
    this.orientation = orientation;
    Asteroids.MovingObject.call(this, position, velocity, this.radius, this.color, game);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.RADIUS = 5;

  Bullet.COLOR = "#98FF98";

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };

  Bullet.prototype.isWrappable = false;

})();
