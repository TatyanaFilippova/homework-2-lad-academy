import { useState } from "react";
import type { TodoItem, TodoSubItem } from "../../App";
import css from "./todoInputCard.module.css";

interface TodoCardProps {
  name: string;
  id: number;
  todoList: TodoItem[];
  setTodoList: (todoList: TodoItem[]) => void;
  deleteTodoItem: (id: number) => void;
  subList: TodoSubItem[];
}

const TodoInputCard = ({
  name,
  todoList,
  setTodoList,
  id,
  subList,
  deleteTodoItem,
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
            const sameElement = subList.find((subListItem) => {
              return cardInputValue === subListItem.name;
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
                    { id: Date.now(), name: cardInputValue },
                  ],
                };
              });
              setCardInputValue("");
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
            <div className={css.wrapper_name} key={subListItem.id}>
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
