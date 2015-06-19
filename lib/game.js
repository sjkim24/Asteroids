(function () {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (xDim, yDim){
    this.asteroids = [];
    this.xDim = xDim;
    this.yDim = yDim;
    this.addAsteroids();
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
    this.bullets = [];
    this.allMovingObjects = this.allObjects();
    this.score = 0;
    this.paused = true;
    this.gameOver = false;
    this.ctx;
    window.addEventListener('keydown', this.keyDown.bind(this), false);
  };

  Game.NUM_ASTEROIDS = 4;

  var allObjects = Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship);
  };

  var checkCollisions = Game.prototype.checkCollisions = function () {
    var objects = this.allMovingObjects;
    for (var i = 0; i < objects.length - 1; i++) {
      var item = objects[i];
      var roids = objects.slice(i + 1);
      for (var j = 0; j < roids.length; j++) {
        if (item.isCollidedWith(roids[j])) {
          item.collideWith(roids[j]);
        }
      }
    }
  };

  var step = Game.prototype.step = function(ctx) {
    this.moveObjects();
    this.checkCollisions();
    this.draw(ctx);
    this.ctx = ctx;
  };

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(this, this.randomPosition()));
    }
  };

  var randomPosition = Game.prototype.randomPosition = function () {
    var randomPositions = [];
    var x = Math.random() * this.xDim;
    var y = Math.random() * this.yDim;
    return [x, y];
  };

  var draw = Game.prototype.draw = function(ctx) {
    var objects = this.allMovingObjects;
    ctx.clearRect(0,0, this.xDim, this.yDim);
    var that = this;

    for (var i = 0; i < objects.length; i++) {
      objects[i].draw(ctx);
    }

    ctx.font = "30px Verdana";
    ctx.fillStyle = "#ffc0cb";
    ctx.textAlign = "left"
    ctx.fillText("SCORE: " + this.score, 32, 60);
    ctx.textAlign = "right";
    ctx.fillText("LIVES: " + this.ship.lives, this.xDim - 50, this.yDim - (this.yDim - 60));
    if (this.ship.lives === 0) {
      this.lose();
      ctx.textAlign = "center";
      ctx.fillStyle = "#8B3A3A";
      ctx.fillText("You Lose! Press P To Restart", this.xDim - (this.xDim / 2), this.yDim - (this.yDim / 2));
      ctx.stroke();
    }
  };

  var moveObjects = Game.prototype.moveObjects = function(ctx) {
    var objects = this.allMovingObjects;
    objects.forEach(function(el) {
      el.move(ctx);
    });
  };


  Game.prototype.wrap = function(pos) {
    var x = pos[0];
    var y = pos[1];
    if (x < 0) {
      x = x + this.xDim;
    }else if (x > this.xDim) {
      x = x - this.xDim;
    }

    if (y < 0) {
      y = y + this.yDim;
    }else if (y > this.yDim) {
      y = y - this.yDim;
    }
    return [x, y];
  };

  Game.prototype.add = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
    this.allMovingObjects.push(obj);
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      if (obj.radius === Asteroids.Asteroid.RADIUS) {
        this.score += 200;
      } else {
        this.score += 50;
      }
      var index1 = this.asteroids.indexOf(obj);
      var index2 = this.allMovingObjects.indexOf(obj);
      this.asteroids.splice(index1, 1);
      this.allMovingObjects.splice(index2, 1);

      if (obj.radius === Asteroids.Asteroid.RADIUS) {
        var pos = [obj.xCoord, obj.yCoord];
        obj.breakIntoTwo(this, pos);
      } else if (this.asteroids.length === 0) {
        this.addRandomAsteroids(obj);
      }
    } else if (obj instanceof Asteroids.Bullet) {
      var index1 = this.bullets.indexOf(obj);
      var index2 = this.allMovingObjects.indexOf(obj);
      this.bullets.splice(index1, 1);
      this.allMovingObjects.splice(index2, 1);
    }
  };

  Game.prototype.isOutOfBounds = function(pos) {
    var xPos = pos[0];
    var yPos = pos[1];
    if ((xPos < 0 || xPos > this.xDim) || (yPos < 0 || yPos > this.yDim)) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.keyDown = function(event) {
    if (event.keyCode == 80) {
      this.pauseGame();
    }
  };

  Game.prototype.pauseGame = function() {
    if (!this.paused && !this.gameOver) {
      window.clearInterval(window.timer);
      window.timer = null;
      this.paused = true;
    } else if (this.paused && !this.gameOver) {
      window.timer = window.setInterval((function () {
        that.game.step(that.ctx);
      }), 20);
      this.paused = false;
    } else if (this.paused && this.gameOver) {

      this.gameOver = false;
      this.asteroids = [];
      this.addAsteroids();
      this.allMovingObjects = this.allObjects();
      this.score = 0;
      this.ship.lives = 5;
      window.timer = window.setInterval((function () {
        that.game.step(that.ctx);
      }), 20);

    }
  };

  Game.prototype.lose = function () {
    this.paused = true;
    this.gameOver = true;
    window.clearInterval(window.timer);
    window.timer = null;
  };

  Game.prototype.addRandomAsteroids = function(obj) {
    var positions = [];

    positions.push(obj.quad1pos());
    positions.push(obj.quad2pos());
    positions.push(obj.quad3pos());
    positions.push(obj.quad4pos());

    for (var i = 0; i < positions.length; i++) {
      var asteroid = new Asteroids.Asteroid(this, positions[i]);
      this.asteroids.push(asteroid);
      this.allMovingObjects.push(asteroid);
    }
  };


})();
