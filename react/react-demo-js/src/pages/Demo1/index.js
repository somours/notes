import React, {useState} from "react";
import { Button } from 'antd'
const HookDemo = () => {
  const [count, setCount] = useState(10);
  const add = () => {
    setCount(count + 1)
  }
  const reduce = () => {
    setCount(() => (count -1))
  }
  return (
    <div>
      <span>{count}</span>
      <Button type="primary" onClick={add}>加</Button>
      <Button type="primary" onClick={reduce}>减</Button>
    </div>
  )
}
export default HookDemo
