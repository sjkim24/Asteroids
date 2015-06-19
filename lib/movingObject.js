(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(position, velocity, radius, color, game) {
    this.xCoord = position[0];
    this.yCoord = position[1];
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.game = game;
  };

  var collideWith = MovingObject.prototype.collideWith = function(otherObject) {};

  var draw = MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.xCoord,
      this.yCoord,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.strokeStyle = '#7C7062';
    ctx.stroke();
  };

  var move = MovingObject.prototype.move = function() {
    var curXCoord = this.xCoord + this.velocity[0];
    var curYCoord = this.yCoord + this.velocity[1];
    var newPos = [curXCoord, curYCoord];
    this.xCoord = newPos[0];
    this.yCoord = newPos[1];
    if (this.game.isOutOfBounds([this.xCoord, this.yCoord])) {
      if (this.isWrappable) {
        newPos = this.game.wrap([curXCoord, curYCoord]);
        this.xCoord = newPos[0];
        this.yCoord = newPos[1];
      } else {
        this.game.remove(this);
      }
    }
  };

  var distance = function(otherObject, item) {
    var xDist = Math.pow(item.xCoord - otherObject.xCoord, 2);
    var yDist = Math.pow(item.yCoord - otherObject.yCoord, 2);

    return Math.sqrt(xDist + yDist);
  };

  var isCollidedWith = MovingObject.prototype.isCollidedWith = function(otherObject){
    var dist = distance(otherObject, this);
    var result = dist <= this.radius + otherObject.radius;

    return result;
  };

  MovingObject.prototype.isWrappable = true;

})();
