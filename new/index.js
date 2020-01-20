/**
 * @description new操作符需要注意一下3点
 * 1.可以访问函数中的属性
 * 2.可以访问函数prototype的属性
 * 3.当有返回值且返回值是对象时的特殊情况的特殊处理
 */
function objectFactory() {
  var obj = {},
      _shift = Array.prototype.shift,
      Constructor = _shift.call(arguments);

  var result = Constructor.apply(obj, arguments);
  result.__proto__ = Constructor.prototype;
  return typeof result === 'object' ? result : obj;
}