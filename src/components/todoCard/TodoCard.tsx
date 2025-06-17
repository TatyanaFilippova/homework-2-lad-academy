import { useState } from "react";
import type { TodoItem } from "../../App";
import css from "./todoCard.module.css";

interface TodoCardProps {
  name: string;
  id: number;
  todoList: TodoItem[];
  setTodoList: (todoList: TodoItem[]) => void;
  subList: {
    id: number;
    name: string;
  }[];
}

const TodoCard = ({
  name,
  todoList,
  setTodoList,
  id,
  subList,
}: TodoCardProps) => {
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
        <button
          className={css.button}
          onClick={() => {
            setTodoList(
              todoList.map((item) => {
                if (item.id !== id) {
                  return item;
                }
                return {
                  ...item,
                  subList: [
                    ...subList,
                    { id: item.subList.length + 1, name: cardData },
                  ],
                };
              }),
            );
          }}
        >
          Добавить
        </button>
      </div>
      {subList.map((item) => {
        return <div>{item.name}</div>;
      })}
    </div>
  );
};

export default TodoCard;
