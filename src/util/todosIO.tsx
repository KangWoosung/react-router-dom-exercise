/*  2024-07-20 18:32:57


*/

import { TodoType } from "@/pages/Todos";

// Helper function to load Todos from LocalStorage
export const loadTodosFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  }
};
// Helper function to save Todos to LocalStorage
export const saveTodosToLocalStorage = (todos: TodoType[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

// todos 의 다음 id 값을 확보한다.
export function genNextTodoId(todos: TodoType[]): number {
  if (todos.length === 0) return 1; // No todos, start with id 1

  // todos 배열에서 가장 큰 ID를 찾는다.
  const maxId = todos.reduce((max, todo) => {
    if (todo.id !== undefined) {
      return todo.id > max ? todo.id : max;
    }
    return max;
  }, 0);

  return maxId + 1;
}
