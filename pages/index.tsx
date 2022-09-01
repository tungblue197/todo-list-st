import type { NextPage } from "next";
import Head from "next/head";
import React, { useState, useMemo } from "react";
import { Input, TodoForm } from "../components";
import BulkAction from "../components/bulk-acton/BulkAction";
import TodoItem from "../components/todo-item/TodoItem";
import { useTodo } from "../hooks/todoList";

const Home: NextPage = () => {
  const { todos, addTodo, updateTodo, removeTodos, setTextSearch } = useTodo();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (id: string) => {
    let newSelectItems = [];
    const isExisting = selectedItems.find((item) => item === id);
    if (isExisting)
      newSelectItems = selectedItems.filter((item) => item !== id);
    else newSelectItems = [...selectedItems, id];
    setSelectedItems(newSelectItems);
  };

  const renderBulkAction = useMemo(() => {
    if (selectedItems.length)
      return (
        <BulkAction
          onRemove={() => {
            setSelectedItems([]);
            removeTodos(selectedItems);
          }}
        />
      );
    return null;
  }, [selectedItems, removeTodos]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  };

  return (
    <div className="page">
      <Head>
        <title>Todo list</title>
      </Head>
      <div className="container">
        <div className="form">
          <h2 className="form__title">New Task</h2>
          <TodoForm onSubmit={addTodo} />
        </div>
        <div className="todo-list">
          <h2 className="todo-list__title">Todo List</h2>
          <div className="todo-list__search">
            <Input placeholder="Search..." onChange={onSearch} />
          </div>

          {todos.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              selectedItems={selectedItems}
              onSelect={handleSelectItem}
              onRemove={(id: string) => removeTodos([id])}
            >
              <TodoForm
                onSubmit={(todo) => updateTodo(todo.id!, todo)}
                item={item}
                type="update"
              />
            </TodoItem>
          ))}
          {renderBulkAction}
        </div>
      </div>
    </div>
  );
};

export default Home;
