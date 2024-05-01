import { Link } from "react-router-dom";
import { useGames } from "../../utils/use_game";

export const Games = () => {
  const [newReleases, topSingle, topMulti, loading] = useGames();

  if (loading) return null;

  return (
    <>
      <h1>Video Games</h1>
      <div className="content">
        <h3>New Releases</h3>
        <div className="list">
          {newReleases && 
          newReleases.map((game) => {
            return (
              <div key={game.id} className='items'>
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
              </div>
            );
          })
          }
        </div>
      </div>
      <div className="content">
        <h3>Top Singleplayer</h3>
        <div className="list">
          {topSingle &&
          topSingle.map((game) => {
            return (
              <div key={game.id} className='items'>
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
              </div>
            )
          })
          }
        </div>
      </div>
      <div className="content">
        <h3>Top Multiplayer</h3>
        <div className="list">
          {topMulti && 
          topMulti.map((game) => {
            return ( 
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
              </div>
            )
          })
          }
        </div>
      </div>
    </>
  )
}