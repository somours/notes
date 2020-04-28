
/*
* 实现map
* */
// 循环实现数组map方法
const selfMap = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  let mapedArr = new Array();
  // console.log(mapedArr);
  for (let i = 0; i < arr.length; i++) {
    if(!arr.hasOwnProperty(i)) continue
    mapedArr[i] = fn.call(context, arr[i], i, this)
  }
  return mapedArr
}

Array.prototype.selfMap = selfMap
const result = [1, 2,3].selfMap(number => number * 2) // [2, 4, 6]
// console.log(result)

// 利用reduce实现数组map方法
const selfMap2 = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  return arr.reduce((prev, cur, index) => {
    // console.log(prev, fn.call(context,cur,index, this))
    return [...prev, fn.call(context,cur,index, this)]
  }, [])
}
Array.prototype.selfMap2 = selfMap2
const result1 = [1, 2,3].selfMap2(number => number * 2) // [2, 4, 6]
// console.log(result1)

/*
* 实现filter
* */
// 循环实现filter
const selfFilter = function (fn, context) {
  const arr = Array.prototype.slice.call(this)
  let filteredArr = new Array()
  for(let i = 0; i < arr.length; i++) {
    if(!arr.hasOwnProperty(i)) continue
    fn.call(context, arr[i], i , this) && filteredArr.push(arr[i])
  }
  return filteredArr
}
Array.prototype.selfFilter = selfFilter

// 利用reduce实现filter
const selfFilter2 = function (fn, context) {
  return this.reduce((prev, cur, index) => {
    return fn.call(context, cur, index, this) ? [...prev, cur] : [...prev]
  }, [])
}

/*
* 实现some
* */
// 循环实现数组的some方法
const selfSome = function (fn, context) {
  const arr = Array.prototype.slice.call(this);
  if(!arr.length) return false
  for(let i = 0; i < arr.length; i++) {
    if(!arr.hasOwnProperty(i)) continue
    const res = fn.call(context, arr[i], i, this)
    if(res) return true
  }
  return false
}

/*
* 实现every
* */
// 循环实现数组的every方法
const selfEvery = function (fn, context) {
  const arr = Array.prototype.slice.call(this);
  if(!arr.length) return true
  for(let i = 0; i < arr.length; i++) {
    if(!arr.hasOwnProperty(i)) continue
    const res = fn.call(context, arr[i], i, this)
    if(!res) return false
  }
  return true
}
Array.prototype.selfEvery = selfEvery
const testEvery = [1,2,3].selfEvery(number => number > 2)
// console.log('testEvery',testEvery)

/*
* 实现reduce
* */
Array.prototype.selfReduce = function (fn, initialValue) {
  const arr = Array.prototype.slice.call(this)
  let res
  let startIndex
  if(initialValue === undefined) {
    //找到第一个非空单元(真实)的元素和小标
    for(let i = 0; i < arr.length; i++) {
      if(!arr.hasOwnProperty(i)) continue
      startIndex = i;
      res = arr[i]
      break
    }
  } else {
    res = initialValue
  }
  for(let i = ++initialValue || 0; i < arr.length; i++) {
    if(!arrr.hasOwnProperty(i)) continue
    res = fn.call(null, res, arr[i], i, this)
  }
  return res
}

/*
* 使用reduce实现flat
* */
// export const isType = type => target => `[Object ${type}]` === Object.prototype.toString.call(target);
// const isArray = isType('Array')
const selfFlat = function (depth = 1) {
  const arr = Array.prototype.slice.call(this)
  if(depth === 0) return arr
  return arr.reduce((prev,cur, index) => {
    if(Array.isArray(cur)) {
      return [...prev, ...selfFlat.call(cur, depth -1)]
    } else {
      return [...prev, cur]
    }
  }, [])
}
