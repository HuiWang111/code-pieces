/**
 * @description 事件节流，注意以下几点：
 * 1.通过leading配置可以设置第一次立即执行
 * 2.通过trailing配置可以设置结束后是否再执行一次
 * 3.this的绑定和arguments的传递
 * 4.可以取消
 * 
 * !!!注意点：
 * leading：false 和 trailing: false 不能同时设置。
 * 如果同时设置的话，比如当你将鼠标移出的时候，因为 trailing 设置为 false，停止触发的时候不会设置定时器，所以只要再
 * 过了设置的时间，再移入的话，就会立刻执行，就违反了 leading: false，bug 就出来了
 * 
 * github地址：
 * https://github.com/mqyqingfeng/Blog/tree/master/demos/throttle
 */
function throttle(func, wait, option) {
  if (typeof func !== 'function') {
    throw new TypeError('throttle first argument except a function');
  }

  wait = wait || 0;
  option = option || {};

  var timerId,
      result,
      lastCallTime = 0,
      context,
      args,
      leading = option.leading,
      trailing = leading === false ? true : option.trailing, // 如果leading和trailing都为false, 忽略trailing
      now = Date.now || function() {
        return +new Date();
      };

  var later = function() {
    timerId && clearTimerId();
    lastCallTime = now();
    func.apply(context, args);
  };

  var clearTimerId = function() {
    clearTimeout(timerId);
    timerId = null;
  };

  var throttled = function() {
    var nowTime = now(),
        remaining = wait - (nowTime - lastCallTime);

    if (!lastCallTime && leading === false) lastCallTime = nowTime; // 第一次调用且leading为false,不执行

    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) { // remaining > wait原因尚未明白
      timerId && clearTimerId();
      lastCallTime = nowTime;
      result = func.apply(context, args);
    } else if (!timerId && trailing !== false) {
      timerId = setTimeout(later, wait);
    }

    return result;
  };

  throttled.cancel = function() {
    timerId && clearTimerId();
    lastCallTime = 0;
  };

  return throttled;
}