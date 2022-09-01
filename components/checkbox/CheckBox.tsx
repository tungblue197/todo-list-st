import React from 'react'

export interface CheckBoxProps{
    label?: string
}

const CheckBox: React.FC<CheckBoxProps & React.HTMLProps<HTMLInputElement>> = ({label, ...rest}) => {
  return (
    <label className='check-box'>
        <input className='check-box__input' type='checkbox' {...rest} />
        <span className='check-box__label label'>{label}</span>
    </label>
  )
}

export default CheckBox