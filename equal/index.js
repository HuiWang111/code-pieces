/**
 * @description 判断两个对象是否相等，注意一下几点：
 * 1. NaN 和 NaN 是相等，[1] 和 [1] 是相等，{value: 1} 和 {value: 1} 是相等
 * 2. 1 和 new Number(1) 是相等，'Curly' 和 new String('Curly') 是相等，true 和 new Boolean(true) 是相等
 * 3. -0和0不相等
 * 4. var a = true; var b = new Boolean(true); console.log(+a === +b) // true
 * 5. var a = new Date(2009, 9, 25); var b = new Date(2009, 9, 25); console.log(+a === +b) // true
 * 6. var a = /a/i; var b = new RegExp(/a/i); console.log('' + a === '' + b) // true
 * 7. var a = Number(NaN); var b = Number(NaN); if (+a !== +a) return +b !== +b; // true
 * 8. 对象拥有相同的键值，但是构造器不一致时，也算为不相等
 * 
 * 参考链接：
 * https://github.com/mqyqingfeng/Blog/issues/41
 * 未完全按照文章的写法，加入了自己的理解，有待验证
 */
var _toString = Object.prototype.toString;
var funcToString = Function.prototype.toString;

function isBasicType(value) {
  var type = typeof value;
  return type !== 'function' && type !== 'object';
}

function hasCtor(object) {
  return 'constructor' in object;
}

function isEqual(a, b) {
  if (a === b) return 1/a === 1/b; // +0 和 0

  if (a !== a) return b !== b; // NaN 和 NaN

  if (a == null || b == null) return false; // null 和其他对象不相等

  if ( (isBasicType(a) && !isBasicType(b)) || (!isBasicType(a) && isBasicType(b)) ) return false;

  return deepEqual(a, b);
}

/**
 * @description 判断object类型是否相等，主要处理构造器判断，数组、对象是否相等
 */
function deepEqual(a, b) {
  var stringTag = _toString.call(a);
  if (stringTag !== _toString.call(b)) return false;

  switch(stringTag) {
    case '[object Boolean]':
    case '[object Date]':
      return +a === +b;
    
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b;

    case '[object Number]':
      if (+a !== +a)  return +b !== +b;
      return +a === +b ? 1/+a === 1/+b : false;
  }

  var isArr = stringTag === '[object Array]';
  if (isArr) {
    var length = a.length;
    if (length !== b.length) return false;

    while(length--) {
      if (!isEqual(a[length], b[length])) {
        return false;
      }
    }
  } else {
    if (typeof a !== 'object' && typeof b !== 'object') return false;

    if (hasCtor(a) && hasCtor(b)) {
      var aCtor = a.constructor,
          bCtor = b.constructor;

      if (funcToString.call(aCtor) !== funcToString.call(bCtor)) {
        return false;
      }
    } else if ( (hasCtor(a) && !hasCtor(b)) || (!hasCtor(a) && hasCtor(b)) ) {
      return false;
    }

    var props = Object.keys(a),
        length = props.length;

    if (length !== Object.keys(b).length) return false;

    while(length--) {
      var key = props[length];
      if (!b.hasOwnProperty(key) || !isEqual(a[key], b[key])) return false;
    }
  }

  return true;
}