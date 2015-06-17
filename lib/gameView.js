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
    key('a', function() { that.game.ship.rotateShip(-15)})
    key('s', function() { that.game.ship.power(1) })
    key('d', function() { that.game.ship.rotateShip(15) })
    key('w', function() { that.game.ship.power(-1) })
    key('l', function() { that.game.ship.fireBullet() })
  };

  GameView.prototype.start = function() {
    this.bindKeyHandlers();
    window.clearInterval(window.timer)
    window.timer = null;
    this.ctx.font = "50px Verdana"
    this.ctx.fillStyle = "#ffc0cb"
    this.ctx.fillText("Press P To Start/Pause/Resume", 32, 60)
    this.ctx.fillText("Press ASWD To Move & L To Shoot", 32, 120)
  };

  GameView.prototype.restart = function() {
    var that = this;
    this.bindKeyHandlers();
    window.timer = window.setInterval((function () {
      that.game.step(that.ctx)
    }), 20);

  }

})();
