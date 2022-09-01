import React from 'react'

export interface ButtonProps {
    type?: 'primary' | 'danger' | 'secondary'
    children?: any
}

const Button: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = ({ children, type = 'primary',  ...rest}) => {
  return (
    <button className={`reset-input-border button button--${type}`} {...rest}>{children}</button>
  )
}

export default Button