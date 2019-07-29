## 盒子模型
- 标准W3C盒子模型， <font color=red>width = content-width</font>
- IE盒子模型，<font color=red>width = content-width + border(左右) + padding(左右值)</font>

## css实现一个三角形

<p style="width: 0; height: 0; font-size: 0; border-top: 16px solid green; border-left: 16px solid transparent; border-right: 16px solid transparent;"></p>

- 上边框设置非透明；
- 下边框不做设置；
- 左右边框设置为透明；
```javascript
  .triangle {
    width: 0;
    height: 0;
    font-size: 0;
    border-top: 16px solid green;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
  }
```
## float知识点，清除浮动
- 使用 overflow: hidden（在父元素操作）
```
.clearfix {
    overflow: hidden;
}
```
- 在父元素里面加一个标签
```javascript
.clear {
    clear: both;
}
```
- 使用伪元素来清除浮动
```
.clearfix {
    zoom: 1; // 为了兼容IE
}
.clearfix: after {
    content: "";
    display: block;
    clear: both;
    height: 0;
    line-height: 0;
    visibility: hidden;
}
```
- 使用双伪元素清除浮动
```
.clearfix {
    zoom: 1; // 为了兼容IE
}
.clearfix:before,.clearfix:after {
    content: "";    
    display: block;    
    clear: both;
}
```

## 使一个元素居中
### 使用 flex
```
.parent {
    width: 520px;
    height: 260px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
}

.child {
    background-color: pink;
    width: 300px;
    height: 150px;
}
```
### 使用 transform（css3 属性）
```
.parent-transform {
    width: 520px;
    height: 260px;
    background-color: green;
    position: relative;
}

.child-transform {
    background-color: pink;
    width: 300px;
    height: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
### 使用 margin 负值
```
.parent-margin {
    width: 520px;
    height: 260px;
    background-color: green;
    position: relative;
}

.child-margin {
    background-color: pink;
    width: 300px;
    height: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -75px;
    margin-left: -150px;
}
```
### 使用 absolute 和 margin
```
.parent-absolute-margin {
    width: 520px;
    height: 260px;
    background-color: green;
    position: relative;
}

.child-absolute-margin {
    background-color: pink;
    width: 300px;
    height: 150px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
```

### 宽度100%时设置图片为正方形，宽高相等
```
.div{
    width:100%;
    height:0px;
    padding-bottom:100%;
    position:relative;
}
.div img{
        width:100%;
        height:100%;
        position:absolute;
}
<div class="div">
    <img src="">
</div>
```

