import React from 'react'
import img from './images/pexels-leif-bergerson-99376750-9843280.jpg'

function Logo(width = '4px') {
  return (
    <div>
      <img src={img} alt="" style={width}  />
    </div>
  )
}

export default Logo