import React, {useState, useEffect, createContext} from "react";
import { Button } from 'antd'
import ContextDemo from './context-demo'
import ReducerDemo from "./reducer-demo";
import Color from './color'
import Buttons from "./buttons";
import ShowArea from "./showArea";

export const CounterContext = createContext()

const HookDemo = () => {
  const [count, setCount] = useState(10);
  const add = () => {
    setCount(count + 1)
  }
  const reduce = () => {
    setCount(() => (count -1))
  }
  useEffect(() => {
    console.log('use effect', count)
  })
  const changeCount = (value) => {
    console.log('enter Change', value)
    setCount(value)
  }
  return (
    <CounterContext.Provider value={count}>
      <div>
        <span>{count}</span>
        <Button type="primary" onClick={add}>加</Button>
        <Button type="primary" onClick={reduce}>减</Button>
        <span>context demo component >> <ContextDemo></ContextDemo></span>
        <ReducerDemo count={count} changeCount={ changeCount}></ReducerDemo>
        <Color>
          <Buttons></Buttons>
          <ShowArea></ShowArea>
        </Color>
      </div>
    </CounterContext.Provider>
  )
}
export default HookDemo
