function isArray(obj) {
    return obj instanceof Array;
  }
  function isObject(obj) {
    return typeof obj === 'object';
  }
  
  Object.prototype.equal = function (obj) {
  
    if (!obj) return false;
  
    if (!isObject(obj) || isArray(obj) || isArray(this)) return false;
  
    for (var key in this) {
  
      if (this.hasOwnProperty(key) !== obj.hasOwnProperty(key)) {
  
        return false;
  
      } else if (typeof this[key] !== typeof obj[key]) {
  
        return false;
  
      }
  
    }
  
    for (var prop in obj) {
  
      if (this.hasOwnProperty(prop) !== obj.hasOwnProperty(prop)) {
  
        return false;
  
      } else if (typeof this[prop] !== typeof obj[prop]) {
  
        return false;
  
      }
  
      //If the property is inherited, do not check any more (it must be equal if both objects inherit it)
      //都是Object原型属性时，两者必然相等
      if (!this.hasOwnProperty(prop)) continue;
  
      if (isArray(this[prop]) && isArray(obj[prop])) {
  
        if (!this[prop].equal(obj[prop])) return false;
  
      } else if (isObject(this[prop]) && isObject(obj[prop])) {
  
        if (!this[prop].equal(obj[prop])) return false;
  
      } else {
  
        if (this[prop] !== obj[prop]) return false;
  
      }
  
    }
  
    return true;
  }
  
  Array.prototype.equal = function (arr) {
  
    if (!arr) return false;
  
    if (!isArray(arr)) return false;
    
    if (this.length !== arr.length) return false;
  
    this.forEach(function (item, index) {
  
      if (isArray(item) && isArray(arr[index])) {
  
        if (!item.equal(arr[index])) return false;
  
      } else if (isObject(item) && isObject(arr[index])) {
  
        if (!item.equal(arr[index])) return false;
  
      } else {
  
        if (item !== arr[index]) return false;
  
      }
      
    });
  
    return true;
  }
  
  Object.defineProperty(Array.prototype, "equal", { enumerable: false });
  Object.defineProperty(Object.prototype, "equal", { enumerable: false });