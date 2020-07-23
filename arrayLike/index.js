/**
 * @description 类数组转数组
 */
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 };
// 1. slice
Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"] 
// 2. splice
Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"] 
// 3. ES6 Array.from
Array.from(arrayLike); // ["name", "age", "sex"] 
// 4. apply
Array.prototype.concat.apply([], arrayLike);


/**
 * @description Arguments对象
 */

/* Arguments对象的length属性，表示实参的长度，举个例子： */
function foo(b, c, d){
    console.log("实参的长度为：" + arguments.length)
}

console.log("形参的长度为：" + foo.length)

foo(1)

// 形参的长度为：3
// 实参的长度为：1

/* callee属性 */
// 闭包经典面试题使用 callee 的解决方法：
var data = [];

for (var i = 0; i < 3; i++) {
    (data[i] = function () {
       console.log(arguments.callee.i) 
    }).i = i;
}

data[0]();
data[1]();
data[2]();

// 0
// 1
// 2

/* arguments 和对应参数的绑定 */
function foo(name, age, sex, hobbit) {
    console.log(name, arguments[0]); // name name

    // 改变形参
    name = 'new name';

    console.log(name, arguments[0]); // new name new name

    // 改变arguments
    arguments[1] = 'new age';

    console.log(age, arguments[1]); // new age new age

    // 测试未传入的是否会绑定
    console.log(sex); // undefined

    sex = 'new sex';

    console.log(sex, arguments[2]); // new sex undefined

    arguments[3] = 'new hobbit';

    console.log(hobbit, arguments[3]); // undefined new hobbit

}

foo('name', 'age');

/*
    传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享
    除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 arguments 是不会共享的。
*/