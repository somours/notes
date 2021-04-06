import React, {useContext} from "react";
import {CounterContext} from './index'
const TestContext = () => {
  const count = useContext(CounterContext)
  const ComputedCount = count + 3
  return (
    <h3>{count} + {ComputedCount}</h3>
  )
}


export default TestContext
