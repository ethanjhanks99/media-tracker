import { useState, useEffect } from "react";
import { useApi } from "./api";

export const useGameList = () => {
  const api = useApi();
  const [games, setGames] = useState([]);

  async function loadGameList() {
    const gameList = await api.get('/game-list/');

    setGames(gameList.games);
  }

  useEffect(() => {
    loadGameList();
  },[]);

  return [games];
}


export const useGame = (id) => {
  const api = useApi();
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);

  async function loadGame() {
    const gameData = await api.get(`/game/${id}/`);

    setGame(gameData.game);
    setLoading(false);
  }

  useEffect(() => {
    loadGame();
  }, []);

  return [game, loading];
}