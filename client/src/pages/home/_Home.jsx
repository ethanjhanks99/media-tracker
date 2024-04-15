import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useMovieList } from "../../utils/use_movie_list"

export const Home = () => {

  const [movieList, nextPage, prevPage, loading, page] = useMovieList();

  return (
    <div>
      <div id='movies'>
        {movieList && 
        movieList.map((movie) => {
          return (
            <div key={movie.id} className='movies'>
              {movie.original_title}
            </div>
          );
        })
        }
        <div className="pages">
          {page>1 && 
          (<button onClick={prevPage}>Previous</button>)
          }
          <button onClick={nextPage}>Next</button>  
        </div>
      </div>
    </div>
  )
}