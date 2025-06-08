import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout'
import HomePage from './homepage'
import TasksPage from './to_do'
import CompletedPage from './completed'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Error: Page not found</div>,

    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'to_do',
        element: <TasksPage />,
      },
         {
        path: 'completed',
        element: <CompletedPage />,
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
