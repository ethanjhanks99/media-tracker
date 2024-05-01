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
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true);

  async function loadGame() {
    const gameData = await api.get(`/game/${id}/`);

    setGame(gameData.game);
    setSaved(gameData.saved);
    setLoading(false);
  }

  useEffect(() => {
    loadGame();
  }, []);

  return [game, saved, loading];
}

export const useGames = () => {
  const api = useApi();
  const [newReleases, setNewReleases] = useState([]);
  const [topSingle, setTopSingle] = useState([]);
  const [topMulti, setTopMulti] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGameLists = async () => {
    const gameData = await api.get('/games/');

    setNewReleases(gameData.newReleases.results);
    setTopSingle(gameData.topSingle.results);
    setTopMulti(gameData.topMulti.results);
    setLoading(false);
  }

  useEffect(() => {
    loadGameLists();
  }, []);

  return [newReleases, topSingle, topMulti, loading];

}