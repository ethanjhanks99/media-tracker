import { useState, useEffect } from "react";
import { useApi } from "./api";

export const useGameList = () => {
  const api = useApi();
  const [games, setGames] = useState([]);

  async function loadGameList() {
    const gameList = await fetch('/game-list/');

    setGames(gameList.games);
  }

  useEffect(() => {
    loadGameList();
  },[]);

  return [games];
}
