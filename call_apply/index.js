Function.prototype.Call = function(context) {
  context = context || window;

  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  context.fn = this;
  var result = eval('context.fn(' + args + ')');
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