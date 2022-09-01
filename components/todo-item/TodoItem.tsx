import React, { useState } from "react";
import { Todo } from "../../hooks/todoList";
import Button from "../button/Button";
import CheckBox from "../checkbox/CheckBox";

export interface TodoItemProps {
  children?: any
  onRemove?: (id: string) => void
  item?: Todo
  selectedItems?: string[]
  onSelect: (id: string) => void
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { children, item, onRemove, selectedItems, onSelect } = props;
  const [open, setOpen] = useState(false)
  const openClass = open ? 'open' : ''

  const onDetailClick = () => {
    setOpen(!open)
  }
  const onRemoveClick = () => {
    onRemove!(item?.id!)
  }
  return (
    <div className="todo-item">
      <div className="todo-item__container">
        <div className="todo-item__label">
          <CheckBox checked={selectedItems?.includes(item?.id as string)} label={item?.title} onChange={(e: any )=> { onSelect(item?.id!)}}/>
        </div>
        <div className="todo-item__action">
          <Button onClick={onDetailClick} type="secondary">Detail</Button>
          <Button onClick={onRemoveClick} type="danger">Remove</Button>
        </div>
      </div>
      <div className={`todo-item__explan-section todo-item__explan-section--${openClass}`}>{children}</div>
    </div>
  );
};

export default TodoItem;
