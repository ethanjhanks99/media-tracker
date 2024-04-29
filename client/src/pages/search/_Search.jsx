import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useApi } from "../../utils/api";

export const Search = () => {
  const { query } = useParams();
  const api = useApi();
  const [loading, setLoading] = useState(true)
  const [movieList, setMovies] = useState([]);
  const [showList, setShows] = useState([]);
  const [gameList, setGames] = useState([]);
  
  useEffect(() => {
    
    const loadResults = async () => {
      const resultData = await api.get(`/search/${query}/`);

      setMovies(resultData.movies.results);
      setShows(resultData.shows.results);
      setGames(resultData.games.results);
  
      setLoading(false);
    }
    loadResults();
  }, [query]);

  if (loading) {
    return null;
  }
  return (
    <div className="search-results">
      <div className="content" id="movies">
        <h3>Movies</h3>
        <div className="list">
        {movieList && 
        movieList.map((movie) => {
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
          {showList &&
          showList.map((show, index) => {
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
          {gameList && 
          gameList.map((game, index) => {
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
