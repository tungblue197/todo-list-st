import React from 'react'

export interface TextAreaProps {
    label?: string
}

const TextArea: React.FC<TextAreaProps & React.HTMLProps<HTMLTextAreaElement>> = ({label, ...rest}) => {
  return (
    <div className='text-area'>
        <label className='text-area__label label'>{label}</label>
        <textarea className='text-area__input reset-input-border' {...rest}/>
    </div>
  )
}

export default TextArea