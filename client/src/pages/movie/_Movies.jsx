import { Link } from "react-router-dom";
import { useMovies } from "../../utils/use_movie"


export const Movies = () => {
  const [nowPlaying, upcoming, popular, loading] = useMovies();

  if (loading) return null;

  return (
    <>
      <div id="movies" className="content">
        <h3>Now Playing</h3>
        <div className="list">
          {nowPlaying && 
          nowPlaying.map((movie) => {
            return (
              <div key={movie.id} className='items'>
                <Link to={`/movie/${movie.id}/`}>
                  <div>
                    <div className="image-wrapper">
                      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className="content-image" />
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
      <div id="movies" className="content">
        <h3>Upcoming</h3>
        <div className="list">
          {upcoming &&
          upcoming.map((movie) => {
            return (
              <div key={movie.id} className='items'>
                <Link to={`/movie/${movie.id}/`}>
                  <div>
                    <div className="image-wrapper">
                      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className="content-image" />
                    </div>
                    <div className="name">
                      <strong>{movie.title}</strong>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
          }
        </div>
      </div>
      <div id="movies" className="content">
        <h3>Popular</h3>
        <div className="list">
          {popular && 
          popular.map((movie) => {
            return ( 
                <div key={movie.id} className="items">
                  <Link to={`/movie/${movie.id}/`}>
                    <div>
                      <div className="image-wrapper">
                        <img src={"https://image.tmdb.org/t/p/original" + movie.poster_path} alt="" className="content-image" />
                      </div>
                      <div className="name">
                        <strong>{movie.title}</strong>
                      </div>
                    </div>
                  </Link>
                </div>
            )
          })
          }
        </div>
      </div>
    </>
  )
}