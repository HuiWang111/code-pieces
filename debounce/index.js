/**
 * @description 事件防抖，注意以下要点：
 * 1.绑定返回函数的this指向
 * 2.arguments传递
 * 3.第一次是否立即执行不延迟
 * 4.假设函数有返回值，虽然绝大部分情况用不到，但出于严谨还是考虑在内
 * 5.中途取消debounce
 * 
 * github地址：
 * https://github.com/mqyqingfeng/Blog/tree/master/demos/debounce
 */
function debounce(func, wait, immediate) {
  if (typeof func !== 'function') {
    throw new Error('debounce first argument except a function');
  }

  wait = wait || 0;

  var timerId,
      result;

  var clearTimerId = function() {
    clearTimeout(timerId);
    timerId = null;
  };

  var setTimerId = function(context, args) {
    timerId && clearTimerId();
    timerId = setTimeout(function() {
      func.apply(context, args);
      clearTimerId();
    }, wait);
  };

  var debounced = function() {
    var args = arguments,
        context = this;

    timerId && clearTimerId(); 

    if (immediate) {
      var callNow = !timerId;
      timerId = setTimeout(function() {
        clearTimerId();
      }, wait);
      callNow && func.apply(context, args);
    } else {
      setTimerId(context, args);
    }

    return result;
  };

  debounced.cancel = function() {
    timerId && clearTimerId();
  };

  return debounced;
}