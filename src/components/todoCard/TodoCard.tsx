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
      <div className={css.wrapper_input_button}>
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
              todoList.map((itemTodoList) => {
                if (itemTodoList.id !== id) {
                  return itemTodoList;
                }
                return {
                  ...itemTodoList,
                  subList: [...subList, { id: Date.now(), name: cardData }],
                };
              }),
            );
          }}
        >
          Добавить
        </button>
      </div>
      <div className={css.wrapper_subList}>
        {subList.map((item) => {
          return (
            <div>
              {item.name} <button className={css.button}>Удалить</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoCard;
