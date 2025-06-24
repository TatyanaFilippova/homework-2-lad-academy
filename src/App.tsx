import TodoInput from "./components/todoInput/TodoInput.tsx";
import css from "./App.module.css";
import TodoInputCard from "./components/todoCard/TodoInputCard.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

export interface TodoItem {
  id: number;
  name: string;
  subList: TodoSubItem[];
}

export interface TodoSubItem {
  id: number;
  name: string;
}

interface IResponseTask {
  id: number;
  title: string;
  description?: string;
}

function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/tasks`);
      const items = response.data.map((item: IResponseTask) => {
        return { id: item.id, name: item.title, subList: [] };
      });
      setTodoList(items);
    } catch {
      // setTodoList();
    } finally {
      // setTodoList();
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addTodoItem = async (value: string) => {
    const sameElement = todoList.find((todoListItem) => {
      return value === todoListItem.name;
    });
    if (!sameElement) {
      await axios.post(`http://localhost:3000/tasks`, {
        title: value,
        description: "",
      });
      await fetchData();
    }
  };

  const deleteTodoItem = async (id: number) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    await fetchData();
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>To-do list</h1>
      <TodoInput addTodoItem={addTodoItem} />
      <div className={css.wrapper_card}>
        {todoList.map((todoItem) => (
          <TodoInputCard
            deleteTodoItem={deleteTodoItem}
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
