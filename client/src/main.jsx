import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import {createHashRouter, Link, RouterProvider} from "react-router-dom";
import { Home } from './pages/home/_Home.jsx'
import { Movie } from './pages/movie/_Movie.jsx'
import { Search } from './pages/search/Search.jsx'


const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/movie/:id",
        element: <Movie />
      },
      {
        path: "/search/:query",
        element: <Search />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
