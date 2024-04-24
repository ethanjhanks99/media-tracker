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
      <div id="movies" className="content">
        <h3>Movies</h3>
        <div className="list">
          {movieList && 
          movieList.map((movie, index) => {
            return (
              <div key={movie.id} className='items'>
                <Link to={`/movie/${movie.id}/`}>
                  <div>
                    <img src={"https://image.tmdb.org/t/p/original" + movie.poster_path} alt="Movie Poster" />
                    <div className="name">
                    {movie.title}
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
          {showList &&
          showList.map((show, index) => {
            return (
              <div key={show.id} className='items'>
                <Link to={`/show/${show.id}/`}>
                  <div>
                    <img src={"https://image.tmdb.org/t/p/original" + show.poster_path} alt="Show Poster" />
                    <div className="name">
                      {show.name}
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
          {gameList && 
          gameList.map((game, index) => {
            return (
              (index < 8 && 
                <div key={game.id} className="items">
                  <Link to={`/game/${game.id}/`}>
                    <div>
                      <img src={game.background_image} alt="" />
                      <div className="name">
                        {game.name}
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