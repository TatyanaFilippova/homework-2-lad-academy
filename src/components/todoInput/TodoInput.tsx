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
        placeholder="Введите задачу"
        value={inputValue}
        onChange={(itemInput) => setInputValue(itemInput.target.value)}
      />
      <button
        disabled={!inputValue.trim()}
        onClick={() => {
          const sameElement = todoList.find((todoListItem) => {
            return inputValue === todoListItem.name;
          });
          if (!sameElement) {
            const nextTodoList = [
              ...todoList,
              { name: inputValue, id: Date.now(), subList: [] },
            ];
            setTodoList(nextTodoList);
            setInputValue("");
          }
        }}
      >
        Добавить
      </button>
    </div>
  );
};

export default TodoInput;
