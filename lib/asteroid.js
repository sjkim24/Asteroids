(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(game, position) {
    this.radius = Asteroid.RADIUS;
    this.color = Asteroid.COLOR;
    this.velocity = Asteroids.Util.randomVec(5);
    this.game = game;
    Asteroids.MovingObject.call(this, position, this.velocity, this.radius, this.color, game);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.RADIUS = 40;

  Asteroid.COLOR = "#8B3A3A";

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.lives -= 1;
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

  Asteroid.prototype.breakIntoTwo = function(game, pos) {
    for (var i = 0; i < 3; i++) {
      var asteroid = new Asteroids.Asteroid(game, pos);
      asteroid.radius = this.radius / 2;
      game.asteroids.push(asteroid);
      game.allMovingObjects.push(asteroid);
    }
  };

  Asteroid.prototype.randomDim = function(minDim, maxDim) {
    return Math.floor(Math.random() * (maxDim - minDim)) + minDim;
  };

  Asteroid.prototype.quad1pos = function() {
    var side = ["top", "right"][Math.floor(Math.random() * 2)];
    var xDim = this.game.xDim;
    var yDim = this.game.yDim;
    var xPos;
    var yPos;
    if (side === "top") {
      xPos = this.randomDim(xDim / 2, xDim);
      yPos = 0;
    } else {
      xPos = 0;
      yPos = this.randomDim(0, yDim / 2);
    }

    return [xPos, yPos];
  };

  Asteroid.prototype.quad2pos = function() {
    var side = ["bottom", "right"][Math.floor(Math.random() * 2)];
    var xDim = this.game.xDim;
    var yDim = this.game.yDim;
    var xPos;
    var yPos;
    if (side === "bottom") {
      xPos = this.randomDim(xDim / 2, xDim);
      yPos = yDim;
    } else {
      xPos = xDim;
      yPos = this.randomDim(yDim / 2, yDim);
    }

    return [xPos, yPos];
  };

  Asteroid.prototype.quad3pos = function() {
    var side = ["bottom", "left"][Math.floor(Math.random() * 2)];
    var xDim = this.game.xDim;
    var yDim = this.game.yDim;
    var xPos;
    var yPos;
    if (side === "bottom") {
      xPos = this.randomDim(0, xDim / 2);
      yPos = yDim;
    } else {
      xPos = 0;
      yPos = this.randomDim(yDim / 2, yDim);
    }

    return [xPos, yPos];
  };

  Asteroid.prototype.quad4pos = function() {
    var side = ["top", "left"][Math.floor(Math.random() * 2)];
    var xDim = this.game.xDim;
    var yDim = this.game.yDim;
    var xPos;
    var yPos;
    if (side === "top") {
      xPos = this.randomDim(0, xDim / 2);
      yPos = 0;
    } else {
      xPos = 0;
      yPos = this.randomDim(0, yDim);
    }

    return [xPos, yPos];
  };




})();
