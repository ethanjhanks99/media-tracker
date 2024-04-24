import { useState } from "react";
import { useParams } from "react-router";
import { useSearch } from "../../utils/search";
import { Link } from "react-router-dom";

export const Search = () => {
  const { query } = useParams();

  const [searchResults, loading]= useSearch(query);

  if (loading) {
    return null;
  }

  console.log(searchResults);
  const movies = searchResults[0].movies.results;
  console.log(movies);
  const shows = searchResults[1].shows.results;
  console.log(shows);
  const games = searchResults[2].games.results;
  console.log(games);

  return (
    <div className="search-results">
      <div className="content" id="movies">
        <h3>Movies</h3>
        <div className="list">
        {movies && 
        movies.map((movie) => {
          return (
            <div key={movie.id} className="items">
              <Link to={`/movie/${movie.id}/`}>
                  <div>
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Movie Poster" />
                    <div className="name">
                    {movie.title}
                    </div>
                  </div>
                </Link>
            </div>
          )
        })}
        </div>
      </div>
      <div id="shows" className="content">
        <h3>Shows</h3>
        <div className="list">
          {shows &&
          shows.map((show, index) => {
            return (
              <div key={show.id} className='movies'>
                <Link to={`/show/${show.id}/`}>
                  <div>
                    <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt="Show Poster" />
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
          {games && 
          games.map((game, index) => {
            return (
              (index < 8 && 
                <div key={game.id} className="movies">
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
    </div>
  )
}
