var Animal,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Animal = (function() {
  function Animal(name) {
    this.sell = __bind(this.sell, this);
    this.name = name;
  }

  Animal.prototype.sell0 = function() {
    return "sell00000000000000";
  };

  Animal.prototype.sell = function(name) {
    return "Give me " + name + " shillings!";
  };

  Animal.find = function(name) {
    return console.log(name);
  };

  return Animal;

})();

module.exports = Animal;
