import { useState } from "react";
import css from "./todoInputCard.module.css";
import type { TodoSubItem } from "../../types.ts";

interface TodoCardProps {
  name: string;
  id: number;
  deleteTodoItem: (id: number) => void;
  subList: TodoSubItem[];
  addTodoSubItem: (value: string, id: number) => void;
  deleteTodoSubItem: (id: number, subItemId: number) => void;
}

const TodoInputCard = ({
  name,
  id,
  subList,
  deleteTodoItem,
  addTodoSubItem,
  deleteTodoSubItem,
}: TodoCardProps) => {
  const [cardInputValue, setCardInputValue] = useState("");
  return (
    <div className={css.wrapper}>
      <div className={css.wrapper_name_button}>
        <h2 className={css.title}>{name}</h2>
        <button
          className={css.button}
          onClick={() => {
            deleteTodoItem(id);
          }}
        >
          Удалить
        </button>
      </div>
      <div className={css.wrapper_input_button}>
        <input
          className={css.input}
          placeholder="Введите задачу"
          value={cardInputValue}
          onChange={(itemInput) => setCardInputValue(itemInput.target.value)}
        />
        <button
          className={css.button}
          disabled={!cardInputValue.trim()}
          onClick={() => {
            addTodoSubItem(cardInputValue, id);
            setCardInputValue("");
          }}
        >
          Добавить
        </button>
      </div>
      <div className={css.wrapper_subList}>
        {subList.map((subListItem) => {
          return (
            <div className={css.wrapper_name} key={subListItem.id}>
              <h3 className={css.title_name}> ▪ {subListItem.name} </h3>
              <button
                className={css.button}
                onClick={() => {
                  deleteTodoSubItem(id, subListItem.id);
                }}
              >
                Удалить
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoInputCard;
