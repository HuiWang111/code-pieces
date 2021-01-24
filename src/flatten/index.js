/**
 * @description 数组扁平化，注意一下几点：
 * @param input 需要被处理的数组
 * @param shallow 是否只处理一层
 * @param output 方便递归而处理的参数
 * github地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */
function flatten(input, shallow, strict, output) {
  output = output || [];

  var idx = output.length,
      i = -1,
      len = input.length;

  while(++i < len) {
    var value = input[i];
    if (Array.isArray(value)) {
      if (shallow) {
        for(var j = 0, length = value.length; j < length; j++) {
          output[idx++] = value[j];
        }
      } else {
        flatten(value, shallow, strict, output);
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }

  return output;
}