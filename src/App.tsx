import TodoInput from "./components/todoInput/TodoInput.tsx";
import css from "./App.module.css";
import TodoInputCard from "./components/todoCard/TodoInputCard.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks`);
        console.log(response.data);
        const items = response.data.map((item: any) => {
          return { id: item.id, name: item.title, subList: [] };
        });
        console.log(items);
        setTodoList(items);
      } catch {
        // setTodoList();
      } finally {
        // setTodoList();
      }
    };
    fetchData();
  }, []);

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
