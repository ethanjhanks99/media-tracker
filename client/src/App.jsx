import { Outlet } from 'react-router'
import { useState, useEffect } from 'react';
import cookie from 'cookie';

function App() {

  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [images, setImages] = useState([]);

  async function getMovies() {

    const res = await fetch("/random/", {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Page": page
      }
    });

    const movies = await res.json();

    console.log(movies.movies);

    setMovieList(movies.movies);
  }

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovieImages() {

  }

  useEffect(() => {
    

  }, [movieList])

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  return (
    <>
      <div id='movies'>
        {movieList && 
        movieList.map((movie) => {
          return (
            <div key={movie.id} className='movies'>
              {movie.original_title}
              
            </div>
          )
        })
        }
      </div>
      <nav><button onClick={logout}>Logout</button></nav>
    </>
  )
}

export default App;
