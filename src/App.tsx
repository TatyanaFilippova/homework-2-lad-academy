import TodoInput from "./components/todoInput/TodoInput.tsx";
import css from "./App.module.css";
import TodoInputCard from "./components/todoCard/TodoInputCard.tsx";
import useTasks from "./task/hook/useTasks.ts";

function App() {
  const {
    addTodoItem,
    deleteTodoItem,
    todoList,
    addTodoSubItem,
    deleteTodoSubItem,
  } = useTasks();
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>To-do list</h1>
      <TodoInput addTodoItem={addTodoItem} />
      <div className={css.wrapper_card}>
        {todoList.map((todoItem) => (
          <TodoInputCard
            deleteTodoItem={deleteTodoItem}
            key={todoItem.id}
            name={todoItem.name}
            id={todoItem.id}
            subList={todoItem.subList}
            addTodoSubItem={addTodoSubItem}
            deleteTodoSubItem={deleteTodoSubItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
