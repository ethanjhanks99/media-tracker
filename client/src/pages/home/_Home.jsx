import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useGameList } from "../../utils/use_game";
import { useMovieList } from "../../utils/use_movie"
import { useShowList } from "../../utils/use_show";

export const Home = () => {

  const [movieList] = useMovieList();
  const [showList] = useShowList();
  const [gameList] = useGameList();

  return (
    <>
      <h1>Home</h1>
      <div id="movies" className="content">
        <h3>Movies</h3>
        <div className="list">
          {
          movieList.map((movie) => {
            return (
              <div key={movie.id} className='items'>
                <Link to={`/movie/${movie.id}/`}>
                  <div>
                    <div className="image-wrapper">
                      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Movie Poster" className="content-image" />
                    </div>
                    <div className="name">
                      <strong>{movie.title}</strong>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
          }
        </div>
      </div>
      <div id="shows" className="content">
        <h3>Shows</h3>
        <div className="list">
          {
          showList.map((show) => {
            return (
              <div key={show.id} className='items'>
                <Link to={`/show/${show.id}/`}>
                  <div>
                    <div className="image-wrapper">
                      <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt="Show Poster" className="content-image" />
                    </div>
                    <div className="name">
                      <strong>{show.name}</strong>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
          }
        </div>
      </div>
      <div id="games" className="content">
        <h3>Video Games</h3>
        <div className="list">
          {
          gameList.map((game, index) => {
            return (
              (index < 8 && 
                <div key={game.id} className="items">
                  <Link to={`/game/${game.id}/`}>
                    <div>
                      <div className="image-wrapper">
                        <img src={game.background_image} alt="" className="content-image" />
                      </div>
                      <div className="name">
                        <strong>{game.name}</strong>
                      </div>
                    </div>
                  </Link>
                </div>)
            )
          })
          }
        </div>
      </div>
    </>
  )
}