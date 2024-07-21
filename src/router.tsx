import { createBrowserRouter, RouteObject } from "react-router-dom";
import PostsRoute from "./pages/Posts";
import PostRoute from "./pages/Post";
import UsersRoute from "./pages/Users";
import UserRoute from "./pages/User";
import TodosRoute from "./pages/Todos";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Popup from "./pages/Popup";
import DialogPopup from "./pages/popup/DialogPopup";
import Signin from "./pages/Signin";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/popup",
        element: <Popup />,
        children: [{ path: "/popup/dialog", element: <DialogPopup /> }],
      },
      {
        path: "/posts",
        children: [
          { index: true, ...PostsRoute },
          { path: ":postId", ...PostRoute },
        ],
      },
      {
        path: "/users",
        children: [
          { index: true, ...UsersRoute },
          { path: ":userId", ...UserRoute },
        ],
      },
      { path: "/todos", ...TodosRoute },
      { path: "/signin", element: <Signin /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
