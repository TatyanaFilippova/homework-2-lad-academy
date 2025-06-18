import TodoInput from "./components/todoInput/TodoInput.tsx";
import css from "./App.module.css";
import TodoInputCard from "./components/todoCard/TodoInputCard.tsx";
import { useState } from "react";

export interface TodoItem {
  id: number;
  name: string;
  subList: {
    id: number;
    name: string;
  }[];
}

function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>To-do list</h1>
      <TodoInput setTodoList={setTodoList} todoList={todoList} />
      <div className={css.wrapper_card}>
        {todoList.map((todoItem) => (
          <TodoInputCard
            key={todoItem.id}
            name={todoItem.name}
            todoList={todoList}
            setTodoList={setTodoList}
            id={todoItem.id}
            subList={todoItem.subList}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
