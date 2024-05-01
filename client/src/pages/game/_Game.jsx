import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useApi } from "../../utils/api";
import { useGame } from "../../utils/use_game";

export const Game = () => {
  const { id } = useParams();
  const [gameData, isSaved, loading] = useGame(id);
  const [saved, setSaved] = useState(isSaved)
  const api = useApi();

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  if (loading) return null;

  const save = async (e) => {
    e.preventDefault();

    api.post(`/game/${id}/`, {
      gameId: gameData.id,
      gameTitle: gameData.name,
      gamePoster: gameData.background_image
    });
    setSaved(true);
  }

  const unsave = async (e) => {
    e.preventDefault();

    api.del(`/game/${id}/`)
    setSaved(false);
  }

  console.log(gameData);
  return (
    <>
      <div className="media-name">
        <h1>{gameData.name}</h1>
      </div>
      <div className="media-info">
        <div>
          <img src={gameData.background_image} alt="Game Poster" className="page-image"/>
          {!saved && <button onClick={save}>Save</button>}
          {saved && <button onClick={unsave}>Unsave</button>}
        </div>
        <div className="information">
          <div className="overview">
            <h3>Overview</h3>
            {gameData.description_raw}
          </div>
          <div className="genre">
            <h3>Genres</h3>
              {gameData.genres.map((genre) => {
                return (
                  <span key={genre.id} className="text">{genre.name}</span>
                  )
                })}
          </div>
          <div className="rating">
            <h3>MetaCritic Rating</h3>
            <span className="text">{gameData.metacritic}</span>
          </div>
          <div className="studios">
            <h3>Developers</h3>
            {
              gameData.developers.map((dev) => {
                return (
                  <div key={dev.id}>
                    <span className="text">{dev.name}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}