import css from "./todoInput.module.css";
import { useState } from "react";
import type { TodoItem } from "../../App";

interface TodoInputProps {
  todoList: TodoItem[];
  setTodoList: (todoList: TodoItem[]) => void;
}

const TodoInput = ({ setTodoList, todoList }: TodoInputProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={css.wrapper}>
      <input
        className={css.text_input}
        placeholder="введите задачу"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          const sameElement = todoList.find((todoListItem) => {
            return inputValue === todoListItem.name;
          });
          if (!sameElement) {
            setTodoList([
              ...todoList,
              { name: inputValue, id: todoList.length + 1, subList: [] },
            ]);
          }
        }}
      >
        Добавить
      </button>
    </div>
  );
};

export default TodoInput;
