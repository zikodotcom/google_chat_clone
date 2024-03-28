import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from './Login.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Register from "./Register.jsx";
import Chat from "./Chat.jsx";
import { Provider } from "react-redux";
import { store } from "./components/app/store.js";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/chat",
    element: <Chat/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  </Provider>
);