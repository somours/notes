import React, {useContext} from "react";
import {ColorContext} from './color'

function ShowArea(props) {
  const {color} = useContext(ColorContext)
  return (
    <div style={{color}}>
      字体颜色为{color}
    </div>
  )
}

export default ShowArea
