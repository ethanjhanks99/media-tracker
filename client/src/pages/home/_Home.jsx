import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useMovieList } from "../../utils/use_movie_list"

export const Home = () => {

  const [movieList, loading] = useMovieList();

  if (loading) return null;

  return (
    <>
      <div id="movies" className="content">
        <h3>Movies</h3>
        <div className="list">
          {movieList && 
          movieList.map((movie) => {
            return (
              <div key={movie.id} className='movies'>
                <div>
                  <img src={"https://image.tmdb.org/t/p/original" + movie.poster_path} alt="Movie Poster" />
                  {movie.title}
                </div>
              </div>
            );
          })
          }
        </div>
      </div>
      <div id="shows" className="content">

      </div>
      <div id="games" className="content">

      </div>
    </>
  )
}