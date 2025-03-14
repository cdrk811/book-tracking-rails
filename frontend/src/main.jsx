import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { CookiesProvider } from "react-cookie";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            { path: "/", element: <App /> }
        ]
    },
    { path: "/sign_in", element: <Login /> },
    { path: "/sign_up", element: <Register /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <RouterProvider router={router} />
      </CookiesProvider>
  </StrictMode>,
)
