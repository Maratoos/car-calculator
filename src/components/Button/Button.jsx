import React from 'react'
import "../../../css/Button.css"
import "../../../css/media.css"

export const Button = ({title, disabled, onClick}) => {
  return (
    <button onClick={onClick} disabled={disabled} className='primary'>{title}</button>
  )
}
