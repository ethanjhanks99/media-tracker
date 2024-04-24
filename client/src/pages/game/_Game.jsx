import { useState } from "react";
import { useParams } from "react-router";
import { useGame } from "../../utils/use_game";

export const Game = () => {
  const { id } = useParams();
  const [gameData, loading] = useGame(id);

  if (loading) return null;

  return (
    <>
      <h3>{gameData.name}</h3>
    </>
  )
}