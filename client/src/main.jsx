import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import {createHashRouter, Link, RouterProvider} from "react-router-dom";
import { Home } from './pages/home/_Home.jsx'
import { Movie } from './pages/movie/_Movie.jsx'
import { Search } from './pages/search/_Search.jsx'
import { Show } from './pages/show/_Show.jsx'
import { Game } from './pages/game/_Game.jsx'
import { Saved } from './pages/saved/_Saved.jsx'
import { Movies } from './pages/movie/_Movies.jsx'
import { Shows } from './pages/show/_Shows.jsx'


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
        path: "/show/:id",
        element: <Show />
      },
      {
        path: "/search/:query",
        element: <Search />
      },
      {
        path: "/game/:id",
        element: <Game />
      },
      {
        path:"/user",
        element: <Saved />
      },
      {
        path: "/movies",
        element: <Movies />
      },
      {
        path: "/shows",
        element: <Shows />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
