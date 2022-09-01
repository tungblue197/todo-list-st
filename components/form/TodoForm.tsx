import React, { useEffect, useMemo, useState } from "react";
import { priorityOptions } from "../../common/constants";
import { Todo } from "../../hooks/todoList";
import useTodoForm from "../../hooks/useTodoForm";
import { formatDate } from "../../common/util";
import Button from "../button/Button";
import Input from "../input/Input";
import Select from "../select/Select";
import TextArea from "../textarea/TextArea";

export interface TodoFormProps {
  type?: "update" | "add";
  onSubmit: (todo: Todo) => void;
  item?: Todo;
}

const INIT_TODO: Todo = {
  done: false,
  title: "",
  desc: "",
  dueDate: new Date(),
  piority: "low",
};

const formValidator = (oldData: Partial<Todo>, params?: any) => ({
  title: (value: string) => {
    return !value ? "title is required" : null;
  },
  dueDate: (value: any) => {
    if (params.type === 'update') {
      return formatDate(oldData.dueDate) < formatDate(value)
        ? "Due date must be greater than old due date"
        : null;
    }
    return formatDate(value) < formatDate(new Date())
      ? "Due date must be greater than today"
      : null;
  },
});

const TodoForm: React.FC<TodoFormProps> = (props) => {
  const { type = "add", onSubmit, item } = props;

  const { formData, setFormData, error, onBlur, onChange, handleSubmit } =
    useTodoForm<Todo>({
      init: INIT_TODO,
      validator: formValidator(item as Partial<Todo>, { type }),
    });

  useEffect(() => {
    if (item) setFormData(item);
  }, [item, setFormData]);

  const onSubmitButtonCick = () => {
    handleSubmit((data) => {
      console.log({ data })
      onSubmit(data)
      if (type === "add") setFormData(INIT_TODO);
    });
  };

  return (
    <div className="todo-form">
      <div className="todo-form__title">
        <Input
          onChange={onChange}
          onBlur={onBlur}
          name="title"
          value={formData.title}
          errorMessage={error?.title}
          error={!!error?.title}
          placeholder="Add new task ..."
        />
      </div>
      <div className="todo-form__desc">
        <TextArea
          onChange={onChange}
          name="desc"
          value={formData.desc}
          label="Description"
          rows={6}
        />
      </div>
      <div className="todo-form__due-date">
        <Input
          onChange={onChange}
          onBlur={onBlur}
          errorMessage={error?.dueDate?.toString()}
          error={!!error?.dueDate}
          name="dueDate"
          value={formatDate(formData.dueDate)}
          type="date"
          label="Due Date"
        />
      </div>
      <div className="todo-form__piority">
        <Select
          onChange={onChange}
          name="piority"
          value={formData.piority}
          options={priorityOptions}
          label="Piority"
        />
      </div>
      <div className="todo-form__button">
        <Button onClick={onSubmitButtonCick}>{type}</Button>
      </div>
    </div>
  );
};

export default TodoForm;
