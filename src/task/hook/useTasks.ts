import { useEffect, useState } from "react";
import { api } from "../api/api.ts";
import type { TodoItem } from "../../types.ts";

interface IResponseTask {
  id: number;
  title: string;
  description?: string;
}

const useTasks = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const fetchData = async () => {
    try {
      const response = await api.get(`/tasks`);
      const items = response.data.map((item: IResponseTask) => {
        return { id: item.id, name: item.title, subList: [] };
      });
      setTodoList(items);
    } catch {
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
      await api.post(`/tasks`, {
        title: value,
        description: "",
      });
      await fetchData();
    }
  };

  const deleteTodoItem = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    await fetchData();
  };

  const addTodoSubItem = (value: string, id: number) => {
    const todoItem = todoList.find((item) => {
      return item.id === id;
    });
    if (!todoItem) {
      return;
    }
    const sameElement = todoItem.subList.find((subListItem) => {
      return value === subListItem.name;
    });
    if (!sameElement) {
      const nextTodoList = todoList.map((itemTodoList) => {
        if (itemTodoList.id !== id) {
          return itemTodoList;
        }
        return {
          ...itemTodoList,
          subList: [...itemTodoList.subList, { id: Date.now(), name: value }],
        };
      });
      setTodoList(nextTodoList);
    }
  };

  const deleteTodoSubItem = (id: number, subItemId: number) => {
    const todoItem = todoList.find((item) => {
      return item.id === id;
    });
    if (!todoItem) {
      return;
    }
    const nextTodoList = todoList.map((todoItem) => {
      if (todoItem.id !== id) {
        return todoItem;
      }
      return {
        ...todoItem,
        subList: todoItem.subList.filter((subItem) => {
          return subItem.id !== subItemId;
        }),
      };
    });
    setTodoList(nextTodoList);
  };

  return {
    addTodoItem,
    deleteTodoItem,
    todoList,
    addTodoSubItem,
    deleteTodoSubItem,
  };
};

export default useTasks;
