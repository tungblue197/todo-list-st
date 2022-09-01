import { useState } from "react";
import React from "react";

export interface TodoFormProps<T> {
  init: T;
  validator?: any;
}



const useTodoForm = <T>({ init, validator }: TodoFormProps<T>) => {

  const [formData, setFormData] = useState<T>(init);
  const [error, setError] = useState<Partial<T>>();

  function checkValidator({ name, value }: { name: string; value?: string }) {
    if (typeof validator[name] === "function") {
      let val = validator[name](value);
      setError((pre) => ({ ...pre, [name]: val }));
      if(val) return true
      return false
    }
    return false
  }

  function checkError(data: any) {
    let isErr = false
    if(typeof validator === 'object'){
        for(const key in validator){
            const err = checkValidator({name: key, value: data[key]})
            if(!isErr) isErr = err
        }
    }
    return isErr
  }

  const onChange = (e: any) => {
    const { name, value } = e.currentTarget;
    setFormData((pre) => ({ ...pre, [name]: value }));
    if (error) {
      setError((pre) => ({ ...pre, [name]: null }));
    }
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    checkValidator({ name, value });
  };

  const handleSubmit = (cb?: (data: T) => void) => {
    const err = checkError(formData);
    if (err) return;
    cb && cb(formData);
  };

  return {
    formData,
    error,
    onChange,
    onBlur,
    setFormData,
    handleSubmit,
  };
};

export default useTodoForm;
