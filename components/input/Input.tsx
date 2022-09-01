import React, { useId, useMemo } from 'react'

export interface InputProps {
  label?: string;
  errorMessage?: string;
  error?: boolean;
}

const Input: React.FC<InputProps & React.HTMLProps<HTMLInputElement>> = (props) => {
  const { label, errorMessage, error ,...rest } = props
  const compId = useId()

  const errorElm = useMemo(() => {
    if(error) return ({
      className: 'input__field--error',
      el: <span className='input__error'>{errorMessage}</span>
    });
    return  ({
      className: '',
      el: null
    })
  }, [error, errorMessage])

  return (
    <div className='input'>
      {
        label && (
          <label className='input__label label' htmlFor={compId} >
            {label}
          </label>
        )
      }
    <input className={`input__field ${errorElm.className}`} id={compId} type='text' {...rest} />
    {
      errorElm.el
    }
  </div>
  )
}


export default Input;