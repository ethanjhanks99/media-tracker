import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSaved } from "../../utils/saved";

export const Saved = () => {
  const [movieList, showList, gameList, username, loading] = useSaved();

  if (loading) return null;

  return (
    <>
      <h1>{username}</h1>
      <div id="movies" className="content">
        <h3>Movies</h3>
        <div className="list">
          { 
          movieList.map((movie, index) => {
            return (
              <div key={movie.id} className='items'>
                <Link to={`/movie/${movie.id}/`}>
                  <div>
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Movie Poster" />
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
          {
          showList.map((show, index) => {
            return (
              <div key={show.id} className='items'>
                <Link to={`/show/${show.id}/`}>
                  <div>
                    <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt="Show Poster" />
                    <div className="name">
                      {show.title}
                    </div>
                  </div>
                </Link>
              </div>
            );
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
                      <img src={game.poster_path} alt="" />
                      <div className="name">
                        {game.title}
                      </div>
                    </div>
                  </Link>
                </div>)
            );
          })
          }
        </div>
      </div>
    </>
  )
}