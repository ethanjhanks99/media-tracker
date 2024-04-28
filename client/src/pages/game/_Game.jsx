import { useState } from "react";
import { useParams } from "react-router";
import { useApi } from "../../utils/api";
import { useGame } from "../../utils/use_game";

export const Game = () => {
  const { id } = useParams();
  const [gameData, loading] = useGame(id);
  const api = useApi();

  if (loading) return null;

  const save = async (e) => {
    e.preventDefault();

    api.post(`/game/${id}/`, {
      gameId: gameData.id,
      gameTitle: gameData.name,
      gamePoster: gameData.background_image
    });
  }

  const unsave = async (e) => {
    e.preventDefault();

    api.del(`/game/${id}/`)
  }

  return (
    <>
      <h3>{gameData.name}</h3>
      <button onClick={save}>Save Me</button>
      <button onClick={unsave}>Unsave</button>
    </>
  )
}