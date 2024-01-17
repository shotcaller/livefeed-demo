import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import RouteErrorPage from './components/RouteErrorPage/RouteErrorPage'
import Wall from './app/wall/Wall'
import Home from './app/home/Home'
import Friends from './app/friends/Friends'
import Room from './app/room/Room'
import { loader as roomTokenLoader } from './app/room/Room'
import { loader as rootAuthLoader } from './Root';
import RoomErrorElement from './app/room/RoomErrorElement'
import { Provider } from 'react-redux'
import store from './store/store'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider store={store}><Root /></Provider>,
    loader: rootAuthLoader,
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
      },
      {
        path: "room",
        loader: roomTokenLoader,
        element: <Room />,
        errorElement: <RoomErrorElement />
      }
    ]
  }
], {
  basename: import.meta.env.VITE_BASENAME
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
