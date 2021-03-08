function Promise(executor) {
  let self = this;
  self.status = 'pending';
  self.value = undefined;
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];
  function resolve(value) {
    if(self.status === 'pending') {
      self.value = value;
      self.status = 'fulFilled';
      self.onResolvedCallbacks.forEach(fn => fn(value));
    }
  }
  function reject(reason) {
    if(self.status === 'pending') {
      self.value = reason;
      self.status = 'reject';
      self.onRejectedCallbacks.forEach(fn => fn(reason));
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  //判断x是不是promise
  //规范中规定：我们允许别人乱写，这个代码可以实现我们的promise和别人的promise 进行交互
  if(promise2 === x){//不能自己等待自己完成
    return reject(new TypeError('循环引用'));
  };
  //
  if(x instanceof Promise) {
    if(x.status === 'pending') {
      x.then(function (v) {
        resolvePromise(promise2, v, resolve, reject);
      })
    } else {
      x.then(resolve,reject);
    }
    return;
  }
  if((x!== null && (typeof x === 'object')) || typeof x === 'function') {
    let called = false; // 防止成功后调用失败
    try {
      let then = x.then;
      if(typeof then === 'function') {
        then.call(x, function rs(k) {
          if(called) return;
          called = true;
          return resolvePromise(promise2, k, resolve, reject);
        }, function rj(r) {
          if(called) return;
          called = true;
          return reject(r);
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if(called) return ;
      called = true;
      return reject(e);
    }
  } else { // 普通的值
    resolve(x)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  let promise2;
  onResolved = typeof onResolved === 'function' ? onResolved : (v) => {return v};
  onRejected = typeof onRejected === 'function' ? onRejected : (v) => {return v};
  if(self.status === 'fulFilled') {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onResolved(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      }, 0)
    })
  }
  if(self.status === 'reject') {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0)
    })
  }

  if(self.status === 'pending') {
    return promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallbacks.push(function (value) {
        try {
          let x = onResolved(value);
          resolvePromise(promise2, x , resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push(function (reason) {
        try {
          let x = onRejected(reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e)
        }
      })
    })
  }
};

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

Promise.resolve = function (value) {
  return new Promise((resolve, rejct) => resolve(value));
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => reject(reason))
};

Promise.all = function (promises) { // 所有的promise都必须正常返回才成功
  // promises 为一个promise的数组
  return new Promise((resolve, reject) => {
    let arr = [];
    let i = 0;
    function processData(index, data) {
      arr[index] = data;
      if(++i === promises.length) {
        resolve(arr)
      }
    }
    for(let k = 0; k < promises.label; k++) {
      promises[k].then((data) => {
        processData(k, data)
      }, reject)
    }
  })
};

Promise.race = function (promises) { // 只要有一个promise返回即直接返回了
  return new Promise((resolve, reject) => {
    for(let i = 0; i < promises.length; i ++) {
      promises[i].then(resolve, reject);
    }
  })
};


Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
