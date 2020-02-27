/**
 * 对象转字符串并拼接为请求参数
 * @param data(Object) 要转换数据
 * @returns {*}
 */
export const objToUrlParams = function (data) {
  let urlParams = '?';
  for (const key in data) {
    if(data.hasOwnProperty(key)) {
      urlParams += `${key}=${data[key]}&`
    }
  }
  return urlParams.endsWith('&') ? urlParams.slice(-1) : urlParams
};

// 加法
export const addition = (arg1, arg2) => { // 加法
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', '')) * cm;
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm;
      arg2 = Number(arg2.toString().replace('.', ''));
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''));
    arg2 = Number(arg2.toString().replace('.', ''));
  }
  return (arg1 + arg2) / m;
};
// 除法
export const division = (arg1, arg2) => { // 除法
  var t1 = 0;
  var t2 = 0;
  var r1;
  var r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {
  }
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {
  }
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
};
// 安卓
export const isAndroid = () => navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
// ios
export const isiOS = () => !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
// 去除指定id的script标签
export const removeScript = (scriptId = 'script') => {
  try {
    document.head.removeChild(document.querySelector('#' + scriptId));
  } catch (e) {
  }
};
// 新增script标签
export const appendScript = (scriptId = 'script', txt) => {
  removeScript(scriptId);
  try {
    var script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    try {
      script.appendChild(document.createTextNode(txt));
    } catch (e) {
      script.text = txt;
    }
    document.head.appendChild(script);
  } catch (e) {
  }
};
// 禁用浏览器返回
export const fobiddenBack = (backCommonFn = backCommon()) => {
  // 防止页面后退
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', backCommonFn);
};
// 启用浏览器返回
export const enableBack = (backCommonFn = backCommon()) => {
  history.go(-1);
  window.removeEventListener('popstate', backCommonFn);
};

export const backCommon = (fn) => {
  return () => {
    if (fn)fn();
    history.pushState(null, null, document.URL);
  };
};

export const awakenApp = (fnStr, data) => {
  try {
    window.android[fnStr](basicsTools.isNull(data) ? '' : JSON.stringify(data));
  } catch (e) {
    try {
      window.webkit.messageHandlers[fnStr].postMessage(basicsTools.isNull(data) ? { name: 1 } : data);
    } catch (e) {
      Toast.fail('请在有信展业APP打开此页面');
    }
  }
};
