/*  2024-07-20 17:56:33

https://jsonplaceholder.typicode.com/todos

Todo Type:
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },

그리고, 
1. Fetch 액션 까지는 못하지만, RDD 와 RHF/ShadCN 을 연동해보는 경험이 필요하다. AddTodo form 을 추가해주자.
2. localStorage 에 todos 를 저장해주고, todos 만 action 을 localStorage 에서 처리해주자.
3. 여기엔 Framer Motion 을 이용한 animation 을 추가해주자..

*/

import { axiosRequest } from "@/util/axiosInstance";
import {
  genNextTodoId,
  loadTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "@/util/todosIO";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import AddTodoForm from "./todo/AddTodoForm";
import axios, { CancelTokenSource } from "axios";

export type TodosLoaderDataType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
export type TodoType = TodosLoaderDataType;

const Todos = () => {
  const todos = useLoaderData() as TodosLoaderDataType[];
  const nextId = genNextTodoId(todos);
  console.log(nextId);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const handleTodoSubmit = () => {
    console.log("Todo Submitted");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-4">
      <div className="w-3/4">
        Todos
        <p></p>
        {todos.slice(0, 10).map((todos) => (
          <div
            key={todos.id}
            className="bg-white rounded-lg shadow-md p-4 my-4"
          >
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">
              {todos.title}
            </h3>
            <p className="text-gray-700">
              {todos.completed ? "Completed" : "In Progress"}
            </p>
          </div>
        ))}
      </div>
      {/* // Add Todo Form */}
      <AddTodoForm nextId={nextId} handleTodoSubmit={handleTodoSubmit} />
    </div>
  );
};

// axiosRequest 에서 에러 처리가 되고 있으므로, loader 에서의 에러 처리는 굳이 필요 없다.
// AbortController 역시 axiosRequest 에서 처리되고 있으므로, loader 에서의 처리는 필요 없다.
// localStorage 에서 todos 를 찾아보고, 없으면 그 때 Jsonplaceholder 에 요청해서 초기 데이터를 받아오기로 하자. 디폴트 데이터는 localStorage 에서 꺼내서 리턴해준다.
const loader = async () => {
  const config = { method: "GET" };
  const cancelTokens: CancelTokenSource[] = [];

  let todosData: TodosLoaderDataType[] = [];

  try {
    todosData = loadTodosFromLocalStorage();
    if (todosData?.length > 0) {
      return todosData;
    }
    const todosResult = await axiosRequest({
      endPoint: "/todos",
      config,
    });
    if (todosResult?.cancelToken) cancelTokens.push(todosResult.cancelToken);
    todosData = todosResult.data;

    return todosData;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
      return null;
    }
    throw e;
  } finally {
    // 모든 요청 취소 (이미 완료된 요청에는 영향 없음)
    cancelTokens.forEach((cancelToken) => {
      cancelToken.cancel("Request canceled by cleanup");
    });
  }
};

/*
// action
const action = async (req) => {
  const formData = await req.formData();
  const title = formData.get("title");
  const completed = formData.get("completed");

  const config = { method: "POST", body: JSON.stringify(title, completed) };
  const todo = await axiosRequest({
    endPoint: "/new",
    config,
  });
};
*/

const TodosRoute = {
  element: <Todos />,
  loader,
};

export default TodosRoute;
