Function.prototype.Call = function(context) {
  context = context || window;

  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  context.fn = this;
  var result = eval('context.fn(' + args + ')'); // 用eval解决参数传递问题
  delete context.fn;
  return result;
};

Function.prototype.Apply = function(context, arr) {
  context = context || window;
  context.fn = this;

  var result;
  if (arr instanceof Array) {
    var args = [];
    for(var i = 1, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')');
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

/**
 * @description bind比较复杂，需要注意3个要点：
 * 1.返回一个函数
 * 2.可以传入参数
 * 3.当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效
 */

/*************作为构造函数时的例子*************/
var value = 2;
var foo = {
  value: 1
};
function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = 'kevin';
var bindFoo = bar.bind(foo, 'daisy');
var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit); // shopping
console.log(obj.friend); // kevin

/*************bind实现*************/
Function.prototype.Bind = function(context) {
  context = context || window;

  var _slice = Array.prototype.slice,
      bindArgs = _slice.Call(arguments, 1),
      self = this;

  var func = function() {
    var args = _slice.Call(arguments);
    return self.Apply(this instanceof noop ? this : context, bindArgs.concat(args));
  };

  /**
   * @description 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值，
   * 但是直接将func.prototype赋值为绑定函数的原型时，当修改func.prototype时绑定函数的原型也会被修改，
   * 因此通过空函数中转
   */
  var noop = function(){};
  noop.prototype = this.prototype;
  func.prototype = new noop();

  return func;
}