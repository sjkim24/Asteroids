(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (position, game) {
    var velocity = [0,0];
    this.orientation = 0;
    this.lives = 5
    Asteroids.MovingObject.call(this, position, velocity, Ship.RADIUS, Ship.COLOR, game);
  }

  Ship.COLOR = "transparent";

  Ship.RADIUS = 20;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.xCoord, this.yCoord);
    ctx.rotate(this.orientation * Math.PI / 180);
    ctx.translate(-1 * this.xCoord, -1 * this.yCoord);

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(
      this.xCoord,
      this.yCoord,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.xCoord, this.yCoord - Ship.RADIUS);
    ctx.lineTo(this.xCoord - (Ship.RADIUS * Math.cos(this.toRadians(60))), (this.yCoord + (Ship.RADIUS * Math.cos(this.toRadians(30)))));
    ctx.lineTo(this.xCoord + (Ship.RADIUS * Math.cos(this.toRadians(60))), (this.yCoord + (Ship.RADIUS * Math.cos(this.toRadians(30)))));
    ctx.lineTo(this.xCoord, this.yCoord - Ship.RADIUS);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = '#1A62A3';
    ctx.fill();
    ctx.strokeStyle = '#F7F6F4';
    ctx.stroke();

    ctx.restore();
  };

  Ship.prototype.isShip = function() {
    return true;
  };

  Ship.prototype.relocate = function() {
    var position = this.game.randomPosition();
    this.xCoord = position[0];
    this.yCoord = position[1];
    this.velocity = [0, 0]
  };

  Ship.prototype.power = function(impulse) {
    var xImp;
    var yImp;
    var deg = this.orientation;
    var pi = Math.PI

    if (deg === 0) {
      xImp = 0;
      yImp = impulse;
    } else if (deg === 90) {
      xImp = -impulse;
      yImp = 0;
    } else if (deg === 180) {
      xImp = 0;
      yImp = -impulse;
    } else if (deg === 270) {
      xImp = impulse;
      yImp = 0;
    } else if (deg > 0 && deg < 90) {
      xImp = -impulse * Math.sin(deg * pi / 180);
      yImp = impulse * Math.cos(deg * pi / 180);
    } else if (deg > 90 && deg < 180) {
      xImp = -impulse * Math.cos(deg % 90 * pi / 180);
      yImp = -impulse * Math.sin(deg % 90 * pi / 180);
    } else if (deg > 180 && deg < 270) {
      xImp = impulse * Math.sin(deg % 90 * pi / 180);
      yImp = -impulse * Math.cos(deg % 90 * pi / 180);
    } else if (deg > 270 && deg < 360) {
      xImp = impulse * Math.cos(deg % 90 * pi / 180);
      yImp = impulse * Math.sin(deg % 90 * pi / 180);
    }

    this.velocity[0] += xImp;
    this.velocity[1] += yImp;
  };

  Ship.prototype.fireBullet = function() {
    var deg = this.orientation;
    var radius = Ship.RADIUS;
    var pi = Math.PI;
    var bulletXVel;
    var bulletYVel;


    if (deg === 0) {
      bulletXVel = 0;
      bulletYVel = -1;
      bulletXCoord = this.xCoord;
      bulletYCoord = this.yCoord - radius;
    } else if (deg === 90) {
      bulletXVel = 1;
      bulletYVel = 0;
      bulletXCoord = this.xCoord + radius;
      bulletYCoord = this.yCoord;
    } else if (deg === 180) {
      bulletXVel = 0;
      bulletYVel = 1;
      bulletXCoord = this.xCoord;
      bulletYCoord = this.yCoord + radius;
    } else if (deg === 270) {
      bulletXVel = -1;
      bulletYVel = 0;
      bulletXCoord = this.xCoord - radius;
      bulletYCoord = this.yCoord;
    } else if (deg > 0 && deg < 90) {
      bulletXVel = Math.sin(deg * pi / 180);
      bulletYVel = -1 * Math.cos(deg * pi / 180);
      bulletXCoord = this.xCoord + bulletXVel * radius;
      bulletYCoord = this.yCoord + bulletYVel * radius;
    } else if (deg > 90 && deg < 180) {
      bulletXVel = Math.cos(deg % 90 * pi / 180);
      bulletYVel = Math.sin(deg % 90 * pi / 180);
      bulletXCoord = this.xCoord + bulletXVel * radius;
      bulletYCoord = this.yCoord + bulletYVel * radius;
    } else if (deg > 180 && deg < 270) {
      bulletXVel = -1 * Math.sin(deg % 90 * pi / 180);
      bulletYVel = Math.cos(deg % 90 * pi / 180);
      bulletXCoord = this.xCoord + bulletXVel * radius;
      bulletYCoord = this.yCoord + bulletYVel * radius;
    } else if (deg > 270 && deg < 360) {
      bulletXVel = -1 * Math.cos(deg % 90 * pi / 180);
      bulletYVel = -1 * Math.sin(deg % 90 * pi / 180);
      bulletXCoord = this.xCoord + bulletXVel * radius;
      bulletYCoord = this.yCoord + bulletYVel * radius;
    }

    var bulletVel = [bulletXVel * 10, bulletYVel * 10];
    var bullet = new Asteroids.Bullet ([bulletXCoord, bulletYCoord], bulletVel, this.game, this.orientation);
    this.game.add(bullet);
  };

  Ship.prototype.toRadians = function(angle) {
    return (angle * (Math.PI / 180));
  };

  Ship.prototype.rotateShip = function(deg) {
    this.orientation += deg
    if (this.orientation < 0) {
      this.orientation += 360;
    } else if (this.orientation >= 360) {
      this.orientation -= 360;
    }

    return this.orientation;
  };

  Ship.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.lives -= 1;
      this.relocate();
    }
  };

})();
