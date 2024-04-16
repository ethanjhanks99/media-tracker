import { useState, useEffect } from "react";
import { useApi } from "./api";

export const useMovieList = () => {
  const api = useApi();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadMovieList() {
    const movieList = await api.get(`/movie-list/`);

    setMovies(movieList.movies);
    setLoading(false);
  }

  useEffect(() => {
    loadMovieList();
  },[]);


  return [movies, loading];

}