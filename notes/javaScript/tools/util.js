/*模拟实现new 功能*/
/*
* 生成一个对象
* 将对象this指向构造函数的原型
* 执行构造函数里的操作
* 返回结果或者生成的对象
* */
import instance from "../../../vue3/vue-cli-vue3/src/assets/js/request";

function myNew(ctor, ...args) {
  if(typeof ctor !== 'function') {
    throw new Error('ctor must be a function');
  }
  let obj = new Object();
  obj.__proto__ = Object.create(ctor.prototype);
  const result = ctor.apply(obj, [...args]);
  const isObject = typeof result === 'object' && typeof result !== null;
  const isFunction = typeof result === 'function';
  return isObject || isFunction ? result : obj
}

/*实现apply,call函数*/
/*
* call参数单独的,一个一个添加,apply参数是一个数组
* */
const myCall = function (context = window, ...args) { // 当传入null等参数时,则指向window,默认值
  // const context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
// Function.prototype.myCall = myCall

const myApply = function (context = window, args) {
  context.fn = this;
  const result = context.fn(args);
  delete context.fn;
  return result;
};
// Function.prototype.myApply = myApply

/*实现bind函数*/
const myBind = function (context, ...args) {
  if(typeof this !== "function") {
    throw new Error('this must be a function');
  }
  const self = this;
  const result = function () {
    self.apply((this instanceOf self) ? this : context, args.concat(Array.prototype.slice().call(arguments)));
  };
  if(this.prototype) {
    result.prototype = Object.create(this.prototype);
  }
  return result;
}


// Function.protoType.myBind = myBind;
