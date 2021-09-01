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

const initialState = 0;
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {number: state.number  + 1};
    case 'decrement':
      return {number: state.number - 1};
    default:
      throw new Error();
  }
}
const init = (initialState) => ({number: initialState})
export const ReducerDemo2 = () => { // 初始值为{number: 0}
  const [state, dispatch] = useReducer(reducer, initialState, init);
  return <>
    <div>reducer demo</div>
    Count: {state.number}
    <div>
      <Button type={"primary"} onClick={() => dispatch({type: 'increment'})}>加</Button>
      <Button type={"primary"} onClick={() => dispatch({type: 'decrement'})}>减</Button>
    </div>
  </>
}
