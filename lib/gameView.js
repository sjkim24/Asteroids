(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.bindKeyHandlers = function() {
    that = this;
    key('space', function() { that.game.ship.fireBullet() });
    key('left', function() { that.game.ship.rotateShip(-15) });
    key('down', function() { that.game.ship.power(1) });
    key('right', function() { that.game.ship.rotateShip(15) });
    key('up', function() { that.game.ship.power(-1) });
  };

  GameView.prototype.start = function() {
    this.bindKeyHandlers();
    window.clearInterval(window.timer);
    window.timer = null;
    this.ctx.font = "30px Verdana";
    this.ctx.fillStyle = "#ffc0cb";
    this.ctx.fillText("PRESS:", 32, 60);
    this.ctx.fillText("P To Start/Pause/Resume", 32, 120);
    this.ctx.fillText("UP/DOWN/RIGHT/LEFT Arrow Keys To Move", 32, 180)
    this.ctx.fillText("SPACE To Shoot Bullets", 32, 240);
  };

  GameView.prototype.restart = function() {
    var that = this;
    this.bindKeyHandlers();
    window.timer = window.setInterval((function () {
      that.game.step(that.ctx);
    }), 20);
  };

})();
