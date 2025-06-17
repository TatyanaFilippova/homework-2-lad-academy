import { useState } from "react";
import type { TodoItem } from "../../App";
import css from "./todoCard.module.css";

interface Props {
  name: string;
  id: number;
  todoList: TodoItem[];
  setTodoList: (todoList: TodoItem[]) => void;
}

const TodoCard = ({ name, todoList, setTodoList, id }: Props) => {
  const [cardData, setCardData] = useState("");
  console.log(cardData);
  return (
    <div className={css.wrapper}>
      <div className={css.wrapper_name_button}>
        <div className={css.title}>{name}</div>
        <button
          className={css.button}
          onClick={() => {
            const filterList = todoList.filter((todoItem) => {
              return todoItem.id !== id;
            });
            setTodoList(filterList);
          }}
        >
          Удалить
        </button>
      </div>
      <div className={css.input_button}>
        <input
          className={css.input}
          placeholder="введите задачу"
          value={cardData}
          onChange={(itemInput) => setCardData(itemInput.target.value)}
        />
        <button className={css.button}>Добавить</button>
      </div>
    </div>
  );
};

export default TodoCard;
