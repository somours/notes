// 根据传递的参数选择器内容，返回查找到的页面DOM元素
// 参数：
// 	selector:选择器，可取以下值
// 		#id
// 		.className
// 		tagName
//	context:查找元素的上下文，即 DOM 元素对象，默认为 document
function $(selector, context) {
	context = context || document
	if (selector.indexOf('#') === 0) // 根据id查找元素
		return document.getElementById(selector.slice(1))
	if (selector.indexOf('.') === 0) // 根据类名查找元素
		return getByClassName(selector.slice(1), context)
	// return context.getElementsByClassName(selector.slice(1));
	return context.getElementsByTagName(selector) // 根据元素名查找
}

// 解决 getElementsByClassName 兼容问题
function getByClassName(className, context) {
	context = context || document
	if (document.getElementsByClassName) // 浏览器支持使用 getElementsByClassName
		return context.getElementsByClassName(className)

	/* 不支持使用 getElementsByClassName */
	// 保存查找到的元素的数组
	var result = []
	// 查找 context 后代的所有元素
	var allTags = context.getElementsByTagName('*')
	// 遍历所有的元素
	for (var i = 0, len = allTags.length; i < len; i++) {
		// 获取当前遍历元素使用的所有 class 类名
		var classNames = allTags[i].className.split(' ')
		// 遍历当前元素的所有类名，和待查找的类名比较
		for (var j = 0, l = classNames.length; j < l; j++) {
			if (classNames[j] == className) { // 当前所在遍历的元素是要查找出来的其中一个
				result.push(allTags[i])
				break
			}
		}
	}
	// 返回查找结果
	return result
}

// 返回指定element元素的CSS属性attr的属性值
// css($("#inner"), "top", "50px");
// css($("#inner"), "left", "200px");
// css($("#inner"), {top:"50px", left:"200px"});
function css(element, attr, value) {
	if (typeof attr === 'object') { // 设置element元素各CSS属性值
		for (var prop in attr) {
			element.style[prop] = attr[prop]
		}
	} else if (typeof attr === 'string' && typeof value !== 'undefined') { // 设置element元素attr对应属性的属性值
		element.style[attr] = value
	} else { // 获取element元素CSS属性值
		return window.getComputedStyle ?
			getComputedStyle(element)[attr] :
			element.currentStyle[attr]
	}
}

// 获取指定元素在文档中的绝对定位，返回定位坐标对象
// 该对象有 top 与 left 两个属性
// 也可用于设置元素在文档中的绝对定位，传递定位坐标对象
// element: 指定DOM元素
// coordinates:设置的定位坐标对象，包含top与left两个属性
function offset(element, coordinates) {
	var _top = 0,
		_left = 0,
		current = typeof coordinates === 'undefined' ?
			element :
			element.offsetParent // 待求解文档绝对定位元素
	// 循环求解元素在文档中绝对定位
	while (current !== null) {
		_top += current.offsetTop
		_left += current.offsetLeft
		current = current.offsetParent
	}

	if (typeof coordinates === 'undefined') // 获取元素在文档中绝对定位
		return {
			top: _top,
			left: _left
		}
	else // 设置元素在文档中绝对定位
		css(element, {
			top: coordinates.top - _top + 'px',
			left: coordinates.left - _left + 'px'
		})
}

// 获取指定元素在其有定位父元素中绝对定位位置
function position(element) {
	return {
		top: element.offsetTop,
		left: element.offsetLeft
	}
}

// 注册指定元素的事件监听
// 事件冒泡
/*function on(element, type, callback) {
	if (element.addEventListener) { // 支持使用 addEventListener方法
		// if (type.slice(0, 2) === "on")
		if (type.indexOf("on") === 0)
			type = type.slice(2);
		element.addEventListener(type, callback, false);
	} else { // 不支持，则使用 attachEvent
		if (type.indexOf("on") !== 0)
			type = "on" + type;
		element.attachEvent(type, callback);
	}
}*/

/* 简易事件委派版本 */
// on($("#box"), "click", ".test", function(){
// 	console.log(this);
// })
function on(element, type, selector, callback) {
	var _callback
	if (typeof selector === 'string') {
		_callback = function (e) {
			e = e || event
			var src = e.target || e.srcElement
			console.log('target:', src)
			var __callback = callback.bind(src)
			if (selector.indexOf('.') === 0) {
				var classNames = src.className.split(' ')
				var index = inArray(selector.slice(1), classNames)
				if (index !== -1) {
					__callback(e)
				}
			} else if (src.nodeName.toLowerCase() === selector.toLowerCase()) {
				__callback(e)
			}
		}
	} else if (typeof selector === 'function') {
		_callback = selector
	}

	if (element.addEventListener) { // 支持使用 addEventListener方法
		if (type.indexOf('on') === 0)
			type = type.slice(2)
		element.addEventListener(type, _callback, false)
	} else { // 不支持，则使用 attachEvent
		if (type.indexOf('on') !== 0)
			type = 'on' + type
		element.attachEvent(type, _callback)
	}
}

// 解除指定元素绑定的事件监听
function off(element, type, callback) {
	if (element.removeEventListener) { // 支持使用 removeEventListener方法
		if (type.indexOf('on') === 0)
			type = type.slice(2)
		element.removeEventListener(type, callback, false)
	} else { // 不支持，则使用 detachEvent
		if (type.indexOf('on') !== 0)
			type = 'on' + type
		element.detachEvent(type, callback)
	}
}

// 保存/读取cookie信息
// key: cookie名称
// value: cookie值，可选，不为 undefined 则表示设置 cookie
// options: 可选，保存 cookie 时的配置参数
// options = {
// 	expires:7, // 失效时间，如果是数字，则表示指定天数后失效，可以取数字或 Date 对象
// 	path:"/", // 路径
// 	domain:"", // 域名
// 	secure:true // 是否安全链接
// }
function cookie(key, value, options) {
	if (typeof value === 'undefined') { // 读取cookie
		// 将所有 cookie 保存到数组中，每个元素的格式如：key=value
		var cookies = document.cookie.split('; ')
		// 遍历数组中的每个 cookie 字符串结构
		for (var i = 0, len = cookies.length; i < len; i++) {
			// 以 = 号分隔字符串，返回数组中第一个元素为 cookie名，第二个元素为 cookie 值
			var cookie = cookies[i].split('=')
			// 判断当前cookie名与待查找的cookie名称是否一致
			if (key === decodeURIComponent(cookie.shift()))
				return decodeURIComponent(cookie.join('='))
		}

		// 找不到 cookie，则返回 null
		return null
	}

	// 保存 cookie
	var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value)
	// 是否有其它设置，比如失效时间
	options = options || {}
	// 失效时间
	if (typeof options.expires !== 'undefined') {
		if (typeof options.expires === 'number') { // 失效时间是数字时间
			var date = new Date()
			date.setDate(date.getDate() + options.expires)
			cookie += ';expires=' + date.toUTCString()
		} else if (typeof options.expires === 'object') {
			cookie += ';expires=' + options.expires.toUTCString()
		}
	}

	// 路径
	if (options.path)
		cookie += ';path=' + options.path
	// 域名
	if (options.domain)
		cookie += ';domain=' + options.domain
	// 安全链接
	if (options.secure)
		cookie += ';secure'

	// 保存 cookie
	document.cookie = cookie
}

// 删除 cookie
function removeCookie(key, options) {
	options = options || {}
	// 删除时，将 cookie 失效时间设置为当前时间之前某一刻
	options.expires = -1
	// 覆盖保存 cookie 即实现删除
	cookie(key, '', options)
}

// 查找指定value在数组array中的下标
function inArray(value, array) {
	if (Array.prototype.indexOf) // 支持 indexOf 方法使用
		return array.indexOf(value)

	for (var i = 0, len = array.length; i < len; i++) {
		if (value === array[i])
			return i
	}

	return -1
}

// 去掉字符串前后空白
function trim(str) {
	if (String.prototype.trim) // 支持使用字符串对象的 trim 方法
		return str.trim()

	var reg = /^\s+|\s+$/g
	return str.replace(reg, '')
}

// 运动框架
// 参数说明：
//		element:
// 		options:
//		speed: 
//		fn: 运动结束后要执行的函数，可选
function animate(element, options, speed, fn) {
	// 先取消在 element 元素上之前已有的运动动画计时器
	clearInterval(element.timer)

	// 求解运动各属性初始值
	var start = {},
		orgion = {}
	for (var attr in options) {
		start[attr] = parseFloat(css(element, attr))
		orgion[attr] = options[attr] - start[attr]
	}

	// 记录开始运动前一刻时间毫秒值
	var startTime = +new Date() // Date.now()

	// 启动计时器，开始实现运动动画效果
	element.timer = setInterval(function () {
		// 计算运动经过的时长（毫秒）
		var elapsed = Math.min(+new Date() - startTime, speed)
		// 为每个运动属性计算当前运动值
		for (var attr in options) {
			var result = elapsed * orgion[attr] / speed + start[attr]
			// 设置元素对应 attr CSS属性值
			element.style[attr] = result + (attr === 'opacity' ? '' : 'px')
			if (attr === 'opacity')
				element.style.filter = 'alpha(opacity=' + (result * 100) + ')'
		}
		// 判断是否运动结束
		if (elapsed === speed) {
			clearInterval(element.timer)
			// 运动执行结束，判断是否有继续要执行的函数，有，则调用执行
			fn && fn()
		}
	}, 1000 / 60)
}

// 淡入
function fadeIn(element, speed, fn) {
	element.style.opacity = 0
	element.style.display = 'block'

	animate(element, {
		opacity: 1
	}, speed, fn)
}

// 淡出
function fadeOut(element, speed, fn) {
	animate(element, {
		opacity: 0
	}, speed, function () {
		element.style.display = 'none'
		fn && fn()
	})
}

时间转换的格式
// export default {
// 获取某个时间格式的时间戳
getTime(time) {
	var stringTime = time
	var timestamp2 = Date.parse(new Date(stringTime))
	timestamp2 = timestamp2
	return timestamp2
}

getYear(time) {
	// 将当前时间换成时间格式字符串
	var timestamp3 = time
	var newDate = new Date()
	newDate.setTime(timestamp3)
	Date.prototype.format = function (format) {
		var date = {
			'M+': this.getMonth() + 1,
			'd+': this.getDate(),
			'h+': this.getHours(),
			'm+': this.getMinutes(),
			's+': this.getSeconds(),
			'q+': Math.floor((this.getMonth() + 3) / 3),
			'S+': this.getMilliseconds()
		}
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		for (var k in date) {
			if (new RegExp('(' + k + ')').test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
			}
		}
		return format
	}
	return newDate.format('yyyy-MM-dd h:m:s')
}

getYea(time) {
	// 将当前时间换成时间格式字符串
	var timestamp3 = time
	var newDate = new Date()
	newDate.setTime(timestamp3)
	Date.prototype.format = function (format) {
		var date = {
			'M+': this.getMonth() + 1,
			'd+': this.getDate(),
			'h+': this.getHours(),
			'm+': this.getMinutes(),
			's+': this.getSeconds(),
			'q+': Math.floor((this.getMonth() + 3) / 3),
			'S+': this.getMilliseconds()
		}
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		for (var k in date) {
			if (new RegExp('(' + k + ')').test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
			}
		}
		return format
	}
	return newDate.format('yyyy-MM-dd')
}

//   }

//tree 的函数
var getTree = function (tree = [], checked = [], expand = []) {
	let arr = []
	if (!!tree && tree.length !== 0) {
		tree.forEach(item => {
			let obj = {}
			obj.title = item.typeName || item.title
			obj.label = item.typeName || item.label
			obj.children = item.childList || item.children // 其他你想要添加的属性
			obj.expand = expand.indexOf(item.id) !== -1 ? true : false
			obj.checked = checked.indexOf(item.id) !== -1 ? true : false
			obj.selected = false
			obj.id = item.id
			obj.value = item.id
			obj.children = getTree(item.childList || item.children, checked) // 递归调用
			arr.push(obj)
		})
	}
	return arr
}

//dom节点操作;
export function hasClass(el, className) {
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
	return reg.test(el.className)
}

export function addClass(el, className) {
	if (hasClass(el, className)) {
		return
	}

	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className = newClass.join(' ')
}

export function getData(el, name, val) {
	const prefix = 'data-'
	if (val) {
		return el.setAttribute(prefix + name, val)
	}
	return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
	let transformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	}

	for (let key in transformNames) {
		if (elementStyle[transformNames[key]] !== undefined) {
			return key
		}
	}

	return false
})()

export function prefixStyle(style) {
	if (vendor === false) {
		return false
	}

	if (vendor === 'standard') {
		return style
	}

	return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}


//克隆对象的方法;
function clone() {
	Object.create = Object.create || function (obj) {
		var F = function () { };
		F.prototype = obj;
		return new F();
	}
}

//计算乘积的函数,缓存代理设计模式
var mult = (function () {
	var cache = {};
	var calculate = function () { // 封闭 calculate 函数
		var a = 1;
		for (var i = 0, l = arguments.length; i < l; i++) {
			a = a * arguments[i];
		}
		return a;
	};
	return function () { //缓存代理主要思想;
		var args = Array.prototype.join.call(arguments, ',');
		if (args in cache) {
			return cache[args];
		}
		return cache[args] = calculate.apply(null, arguments);
	}
})();

//图片请求不注意的一个小坑
var report = (function () {
	var imgs = [];
	return function (src) {
		var img = new Image();
		imgs.push(img);
		img.src = src;
	}
})();


//延迟节流函数;
var throttle = function (fn, interval) {
	var __self = fn, // 保存需要被延迟执行的函数引用
		timer, // 定时器
		firstTime = true; // 是否是第一次调用
	return function () {
		var args = arguments,
			__me = this;
		if (firstTime) { // 如果是第一次调用，不需延迟执行
			__self.apply(__me, args);
			return firstTime = false;
		}
		if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成
			return false;
		}
		timer = setTimeout(function () { // 延迟一段时间执行
			clearTimeout(timer);
			timer = null;
			__self.apply(__me, args);
		}, interval || 500);
	};
};
// window.onresize = throttle(function () {
//   console.log(1);
// }, 500);



function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
	let _arr = arr.slice()
	for (let i = 0; i < _arr.length; i++) {
		let j = getRandomInt(0, i)
		let t = _arr[i]
		_arr[i] = _arr[j]
		_arr[j] = t
	}
	return _arr
}
//延迟节流函数;
export function debounce(func, delay) {
	let timer

	return function (...args) {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}



export function hasClass(el, className) {
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
	return reg.test(el.className)
}

export function addClass(el, className) {
	if (hasClass(el, className)) {
		return
	}

	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className = newClass.join(' ')
}

export function getData(el, name, val) {
	const prefix = 'data-'
	if (val) {
		return el.setAttribute(prefix + name, val)
	}
	return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
	let transformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	}

	for (let key in transformNames) {
		if (elementStyle[transformNames[key]] !== undefined) {
			return key
		}
	}

	return false
})()

export function prefixStyle(style) {
	if (vendor === false) {
		return false
	}

	if (vendor === 'standard') {
		return style
	}

	return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}



export function param(data) {
	let url = ''
	for (var k in data) {
		let value = data[k] !== undefined ? data[k] : ''
		url += '&' + k + '=' + encodeURIComponent(value)
	}
	return url ? url.substring(1) : ''
}


//深拷贝
(function ($) {
	'use strict';

	var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');

	function type() {
		return Object.prototype.toString.call(this).slice(8, -1);
	}

	for (var i = types.length; i--;) {
		$['is' + types[i]] = (function (self) {
			return function (elem) {
				return type.call(elem) === self;
			};
		})(types[i]);
	}

	return $;
})(window.$ || (window.$ = {})); //类型判断

function copy(obj, deep) {
	if (obj === null || (typeof obj !== "object" && !$.isFunction(obj))) {
		return obj;
	}

	if ($.isFunction(obj)) {
		return new Function("return " + obj.toString())();
	} else {
		var name, target = $.isArray(obj) ? [] : {},
			value;
		for (name in obj) {
			value = obj[name];
			if (value === obj) {
				continue;
			}
			if (deep) {
				if ($.isArray(value) || $.isObject(value)) {
					target[name] = copy(value, deep);
				} else if ($.isFunction(value)) {
					target[name] = new Function("return " + value.toString())();
				} else {
					target[name] = value;
				}
			} else {
				target[name] = value;
			}
		}
		return target;
	}
}


//只能输入数字,且把输入的数字按每三个隔一个逗号分开.
function onlyNumber(e) {
	let value = e.target.value + ""
	value = value.split(",").join();
	// console.log("onlyNumber",value )
	//得到第一个字符是否为负号
	var t = value.charAt(0);
	//先把非数字的都替换掉，除了数字和.
	value = value.replace(/[^\d\.]/g, "");
	//必须保证第一个为数字而不是.
	value = value.replace(/^\./g, "");
	//保证只有出现一个.而没有多个.
	value = value.replace(/\.{2,}/g, ".");
	//保证.只出现一次，而不能出现两次以上
	value = value
		.replace(".", "$#$")
		.replace(/\./g, "")
		.replace("$#$", ".");
	//如果第一位是负号，则允许添加
	// if (t == "-") {
	//   obj.value = "-" + obj.value;
	// }
	let dotIndex = value.indexOf('.')
	let haveDot = dotIndex > -1 ? true : false
	let tmpValue = ""
	if (haveDot) {
		let dotPrev = value.slice(0, dotIndex)
		let dotNext = value.slice(dotIndex + 1)
		// console.log(dotPrev,dotNext)
		tmpValue = this.addSysbom(dotPrev) + '.' + this.addSysbom(dotNext)
	} else {
		tmpValue = this.addSysbom(value)
	}

	this.faBiShuLiang = tmpValue
}
function addSysbom(value) {
	let tmpArr = value.split("")
	let count = 0
	let tmpValue = ""
	for (var i = tmpArr.length - 1; i >= 0; i--) {
		count++
		if (count % 3 === 0) {
			tmpValue = ',' + tmpArr[i] + tmpValue
		} else {
			tmpValue = tmpArr[i] + tmpValue
		}
	}
	if (tmpValue.indexOf(',') === 0) {
		tmpValue = tmpValue.slice(1)
	}
	return tmpValue
}

class OS {
	constructor() {
		let ua = window.navigator.userAgent
		let isWindowsPhone = /(?:Windows Phone)/.test(ua)
		let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
		let isAndroid = /(?:Android)/.test(ua)
		let isFireFox = /(?:Firefox)/.test(ua)
		let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
		let isPhone = /(?:iPhone)/.test(ua) && !isTablet
		let isPc = !isPhone && !isAndroid && !isSymbian
		this.isPad = isTablet
		this.isPhone = isPhone
		this.isPc = isPc
	}
}
Vue.prototype.os = new OS()


export function setCookie(name, value) {
	var Days = 30 * 12 * 10;

	var exp = new Date();

	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	if (process.client) {
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
	}
}

export function getCookie(name) {
	var arr
	var reg
	if (process.client) {
		reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
		if (document.cookie.match(reg)) {
			arr = document.cookie.match(reg)
			return unescape(arr[2])
		} else {
			return null
		}
	} else {
		reg = new RegExp("(^| )" + name.name + "=([^;]*)(;|$)")
		if (name.src.match(reg)) {
			arr = name.src.match(reg)
			return unescape(arr[2])
		} else {
			return null
		}
	}
}

export function delCookie(name) {
	var exp = new Date();

	exp.setTime(exp.getTime() - 1);

	var cval = getCookie(name);

	if (cval != null) { document.cookie = name + "=" + cval + "=; expires=" + exp.toGMTString() + "; path=/"; }
}

export function getServiceCookie(name, req) {
	const cookie = req.headers.cookie || '';
	var arr
	var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
	if (cookie.match(reg)) {
		arr = cookie.match(reg)
		return unescape(arr[2])
	} else {
		return null
	}
}

///Vue的指令
Vue.directive('focus', {
	binding: function (el, option) {
		let defClass = 'el-input'
		let defTag = 'input'
		let value = option.value
		if (typeof value === 'boolean') {
			value = { cls: defClass, tag: defTag, foc: value }
		} else {
			value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false }
		}
		if (el.classList.contains(value.cls) && value.foc) {
			el.getElementsByTagName(value.tag)[0].focus()
		}
	}
})

Vue.directive('num', {
	bind: function (el, option) {
		let _this = Vue.prototype
		let defTag = el.getElementsByTagName('input')[0]
		var lastValue
		defTag.addEventListener('keyup', function (e) {
			let value = e.target.value
			let reg = /^-?[0-9]+\.?[0-9]*$/
			//  退格不做处理
			if (e.keyCode === 8) {
				lastValue = value
				return
			}
			//  如果首位是负号，且仅出现一次，不走验证
			if (e.keyCode === 189 && value.indexOf('-') === 0 && value.split('-').length <= 2) {
				lastValue = value
				return
			}
			//  等待下次渲染时候改变输入框的值
			_this.$nextTick(() => {
				if (!reg.test(value)) {
					e.target.value = lastValue
				} else {
					lastValue = value
				}
			})
		})
		defTag.addEventListener('blur', function (e) {
			let value = e.target.value
			_this.$nextTick(() => {
				e.target.value = Number(value).toString()
				defTag.dispatchEvent(new Event('input'))
			})
		})
	}
})

//  正浮点数
Vue.directive('posNum', {
	bind: function (el, option) {
		let _this = Vue.prototype
		let defTag = el.getElementsByTagName('input')[0]
		var lastValue = ''
		defTag.addEventListener('keyup', function (e) {
			// debugger
			let value = e.target.value
			let reg = /^[0-9]+\.?[0-9]*$/
			//  退格不做处理
			if (e.keyCode === 8) {
				lastValue = value
				return
			}
			//  等待下次渲染时候改变输入框的值
			_this.$nextTick(() => {
				if (!reg.test(value)) {
					e.target.value = lastValue
					defTag.dispatchEvent(new Event('input'))
				} else {
					lastValue = value
				}
			})
		})
		defTag.addEventListener('blur', function (e) {
			let value = e.target.value
			_this.$nextTick(() => {
				e.target.value = Number(value).toString()
				defTag.dispatchEvent(new Event('input'))
			})
		})
	}
})

//  正整数
Vue.directive('posInt', {
	bind: function (el, option) {
		let _this = Vue.prototype
		let defTag = el.getElementsByTagName('input')[0]
		var lastValue
		defTag.addEventListener('keyup', function (e) {
			// debugger
			let value = e.target.value
			let reg = /^[0-9]?[0-9]*$/
			//  退格不做处理
			if (e.keyCode === 8) {
				lastValue = value
				return
			}
			//  等待下次渲染时候改变输入框的值
			_this.$nextTick(() => {
				if (!reg.test(value)) {
					e.target.value = lastValue
					defTag.dispatchEvent(new Event('input'))
				} else {
					lastValue = value
				}
			})
		})
	}
})
