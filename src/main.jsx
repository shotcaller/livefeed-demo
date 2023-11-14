import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import RouteErrorPage from './components/RouteErrorPage/RouteErrorPage'
import Wall from './app/wall/wall'
import Home
 from './app/home/Home'
import Friends from './app/friends/Friends'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "wall",
        element: <Wall />
      },
      {
        path: "friends",
        element: <Friends />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
