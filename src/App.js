import './App.css';
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import GlobalLayout from './Layouts/GlobalLayout';
import Registration from './Pages/Registration';
import {Container, Box, Typography} from '@mui/material'
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Dashboard from './Pages/Dashboard';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GlobalLayout />,
        children: [
          {
            element: <Home />,
            index: true
          },
          {
              element: <Dashboard />,
              path: "/dashboard"
          }
        ]
      },
      {
        element: <Registration />,
        path: "/register"
      },
      {
        element: <Login />,
        path: "/signin"
      },
       ]);

  return (
    <div className="App ">
      <RouterProvider router={router}>
     
      </RouterProvider>
    </div>
  );
}

export default App;
