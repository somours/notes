##keep-alive

- 属性值： include(字符串或者正则)，只有匹配的组件会被缓存
- 属性值:  exclude(字符串或者正则), 任何名称匹配的组件都不会被缓存

- 可结合组件的is组件做动态渲染如： 
```javascript
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```
- 和transition一起使用时，transition在外面
```javascript
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```
- 对应的钩子函数： 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

- max(2.5.0 新增) 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。

element UI 中tab有缓存的功能，可能内部使用了keep-alive