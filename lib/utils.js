;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Util = Asteroids.Util = {};


  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();

  };

  Util.randomVec = function(length) {
    var idx = Math.floor(Math.random() * 2)
    var x = Math.random() * length * [ -1, 1][idx];
    var idx = Math.floor(Math.random() * 2)
    var y = Math.sqrt(Math.pow(length, 2) - Math.pow(x, 2)) *  [ -1, 1][idx];
    return [x, y] ;
  };

})();
