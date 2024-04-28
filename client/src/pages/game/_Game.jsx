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

  return (
    <>
      <h3>{gameData.name}</h3>
      {!saved && <button onClick={save}>Save Me</button>}
      {saved && <button onClick={unsave}>Unsave</button>}
    </>
  )
}