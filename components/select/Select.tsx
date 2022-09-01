import React from "react";


export type InputOption = { name: string, value: string | number }

export interface SelectProps {
    label?: string;
    options: Array<InputOption>;
    value?: string | number;
}

const Select: React.FC<SelectProps & React.HTMLProps<HTMLSelectElement>> = ({options, label, ...rest}) => {
  
  return (
    <div className="select">
      <label className="select__label label">{label}</label>
      <select className="select__list" {...rest}>
        {
            options.map(({name, value}) => (<option key={value} value={value}>{name}</option>))
        }
      </select>
    </div>
  );
};

export default Select;
