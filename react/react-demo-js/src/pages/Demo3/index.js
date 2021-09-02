import React from "react";
import {Space} from 'antd'
import ForwardRefDemo from './forwardRef-demo'
import SuspenseLazyDemo from './Suspense-lazy-demo'

const Home = () => {
  return (
    <div>
      <Space direction={"vertical"}>
        <div>
          我是demo3, react.class.component
        </div>
        <ForwardRefDemo></ForwardRefDemo>
        <SuspenseLazyDemo></SuspenseLazyDemo>
      </Space>
    </div>
  )
}
export default Home
