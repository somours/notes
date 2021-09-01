import React, {useState, useEffect, createContext} from "react";
import { Button, Space } from 'antd'
import ContextDemo from './context-demo'
import {ReducerDemo2} from "./reducer-demo";
import Color from './color'
import Buttons from "./buttons";
import ShowArea from "./showArea";
import LayoutEffect from './layoutEffect-demo'
import {CustomHookDemo1, Counter1, Counter2} from './custom-hook'
import CountDown from './CountDown'


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
  // const changeCount = (value) => {
  //   console.log('enter Change', value)
  //   setCount(value)
  // }
  return (
    <CounterContext.Provider value={count}>
      <Space direction="vertical">
        <div>
          <p>useState: </p>
          <span>{count}</span>
          <Button type="primary" onClick={add}>加</Button>
          <Button type="primary" onClick={reduce}>减</Button>
        </div>

        <div>
          <p>useReducer:</p>
          <span>context demo component >> <ContextDemo></ContextDemo></span>
        </div>
        <div>
          <p>useContext: </p>
          <Color>
            <Buttons></Buttons>
            <ShowArea></ShowArea>
          </Color>
        </div>
        <ReducerDemo2></ReducerDemo2>
        <div>
          <LayoutEffect></LayoutEffect>
        </div>
        <CustomHookDemo1></CustomHookDemo1>
        <Counter1></Counter1>
        <Counter1></Counter1>
        <div>
          倒计时:
          <CountDown></CountDown>
        </div>
      </Space>
    </CounterContext.Provider>
  )
}
export default HookDemo
