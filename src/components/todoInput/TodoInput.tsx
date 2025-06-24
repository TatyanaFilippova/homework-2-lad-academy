import css from "./todoInput.module.css";
import { useState } from "react";

interface TodoInputProps {
  addTodoItem: (value: string) => void;
}

const TodoInput = ({ addTodoItem }: TodoInputProps) => {
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
          addTodoItem(inputValue);
        }}
      >
        Добавить
      </button>
    </div>
  );
};

export default TodoInput;
