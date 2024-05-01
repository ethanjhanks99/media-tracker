import { Link } from "react-router-dom";
import { useShows } from "../../utils/use_show";

export const Shows = () => {
  const [nowAiring, upcoming, popular, loading] = useShows();

  if (loading) return null;

  return (
    <>
      <h1>Shows</h1>
      <div className="content">
        <h3>New Episodes Airing</h3>
        <div className="list">
          {nowAiring && 
          nowAiring.map((show) => {
            return (
              <div key={show.id} className='items'>
                <Link to={`/show/${show.id}/`}>
                  <div>
                    <div className="image-wrapper">
                      <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt="" className="content-image" />
                    </div>
                    <div className="name">
                      <strong>{show.name}</strong>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
          }
        </div>
      </div>
      <div className="content">
        <h3>On Air</h3>
        <div className="list">
          {upcoming &&
          upcoming.map((show) => {
            return (
              <div key={show.id} className='items'>
                <Link to={`/show/${show.id}/`}>
                  <div>
                    <div className="image-wrapper">
                      <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt="" className="content-image" />
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
      <div className="content">
        <h3>Top Rated</h3>
        <div className="list">
          {popular && 
          popular.map((show) => {
            return ( 
              <div key={show.id} className="items">
                <Link to={`/show/${show.id}/`}>
                  <div>
                    <div className="image-wrapper">
                      <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt="" className="content-image" />
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
    </>
  )
}