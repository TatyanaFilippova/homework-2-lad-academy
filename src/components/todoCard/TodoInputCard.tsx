import { useState } from "react";
import type { TodoItem } from "../../App";
import css from "./todoInputCard.module.css";

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

const TodoInputCard = ({
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
        <h2 className={css.title}>{name}</h2>
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
          disabled={!cardData.trim()}
          onClick={() => {
            const sameElement = subList.find((subListItem) => {
              return cardData === subListItem.name;
            });
            if (!sameElement) {
              const nextTodoList = todoList.map((itemTodoList) => {
                if (itemTodoList.id !== id) {
                  return itemTodoList;
                }
                return {
                  ...itemTodoList,
                  subList: [
                    ...itemTodoList.subList,
                    { id: Date.now(), name: cardData },
                  ],
                };
              });
              setCardData("");
              setTodoList(nextTodoList);
            }
          }}
        >
          Добавить
        </button>
      </div>
      <div className={css.wrapper_subList}>
        {subList.map((subListItem) => {
          return (
            <div className={css.wrapper_name}>
              <h3 className={css.title_name}> ▪ {subListItem.name} </h3>
              <button
                className={css.button}
                onClick={() => {
                  const nextTodoList = todoList.map((todoItem) => {
                    if (todoItem.id !== id) {
                      return todoItem;
                    }
                    return {
                      ...todoItem,
                      subList: subList.filter((subItem) => {
                        return subItem.id !== subListItem.id;
                      }),
                    };
                  });
                  setTodoList(nextTodoList);
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
