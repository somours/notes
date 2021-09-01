import React, {Component} from "react";
import './index.css';
const Home = () => {
  return (
    <div>
      <p>
        我是demo2
      </p>
      <div className="wraper">
        <input type="checkbox" className="exp" id="exp" />
          <div className="text">
            <label className="btn" htmlFor="exp"></label>
            浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，
            {/*它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。*/}
            {/*浮动元素是如何定位的 正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。 在下面的图片中，有三个红色的正方形。其中有两个向左浮动*/}
          </div>
      </div>
    </div>
  )
}


export default Home
