import { useEffect, useMemo, useState, useTransition } from "react";
import {
  generateId,
  getDataFormLocalStorage,
  saveToLocalStoreage,
} from "../common/util";

export type Todo = {
  id?: string;
  done: boolean;
  title: string;
  desc?: string;
  dueDate?: Date;
  piority: "low" | "normal" | "high";
};

export const useTodo = () => {
  const [data, setData] = useState<Array<Todo>>([]);
    const [textSearch, setTextSearch] = useState<string>('')

  useEffect(() => {
    const storeData = getDataFormLocalStorage();
    if (storeData) setData(storeData as Array<Todo>);
  }, []);

  const todos = useMemo(() => {
    if(!textSearch) return data
    return data.filter(item => item.title.match(new RegExp(textSearch,'g')))
  }, [textSearch, data])

  const updateTodo = (id: string, todoItem: Todo) => {
    const newData = data.map((item) => {
      if (item.id === todoItem.id) return todoItem;
      return item;
    });
    setData(newData);
    saveToLocalStoreage(newData);
  };

  const addTodo = (TodoItem: Todo) => {
    const id = generateId();
    TodoItem.id = id;
    setData([TodoItem, ...data]);
    saveToLocalStoreage([TodoItem,...data]);
  };

  const removeTodos = (ids: string[]) => {
    const newData = data.filter((item) => !ids.includes(item.id as string));
    setData(newData);
    saveToLocalStoreage(newData);
  };
  return {
    todos,
    addTodo,
    updateTodo,
    removeTodos,
    setTextSearch
  };
};
