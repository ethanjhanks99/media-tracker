import { useEffect, useState } from "react";
import { useApi } from "./api";

export const useSaved = () => {
  const api = useApi();
  const [movieList, setMovies] = useState([]);
  const [showList, setShows] = useState([]);
  const [gameList, setGames] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  async function getSaved() {
    const saved = await api.get("/saved/");

    setMovies(saved.movies);
    setShows(saved.shows);
    setGames(saved.games);
    setUsername(saved.username);
    setLoading(false)
  }

  useEffect(() => {
    getSaved();
  }, []);

  return [movieList, showList, gameList, username, loading];
}