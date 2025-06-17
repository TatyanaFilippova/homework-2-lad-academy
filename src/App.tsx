import TodoInput from "./components/todoInput/TodoInput.tsx";
import css from "./App.module.css";
import TodoCard from "./components/todoCard/TodoCard.tsx";
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
      <TodoInput setTodoList={setTodoList} todoList={todoList} />
      <div className={css.wrapper_card}>
        {todoList.map((todoItem) => (
          <TodoCard
            key={todoItem.id}
            name={todoItem.name}
            todoList={todoList}
            setTodoList={setTodoList}
            id={todoItem.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
