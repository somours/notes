import React, {useReducer} from "react";
import {Button} from 'antd'

export default function ReducerDemo (props) {
  const {count: propsCount, changeCount} = props
  const [count, dispatch] = useReducer((state, action) => {
    switch (action) {
      case 'add':
        return state + 1
      case 'sub':
        return state - 1
      default:
        return state
    }
  }, 0)
  return (
    <div>
      <h2>现在的分数是{count}, props的Count是 {propsCount}</h2>
      <Button onClick={() => dispatch('add')}>Increment</Button>
      <Button onClick={() => dispatch('sub')}>Decrement</Button>
      <Button onClick={() => changeCount(propsCount * 2)}>change props</Button>
    </div>
  )
}
