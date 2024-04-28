import { useState, useEffect } from "react";
import { useApi } from "./api";

export const useMovieList = () => {
  const api = useApi();
  const [movies, setMovies] = useState([]);

  async function loadMovieList() {
    const movieList = await api.get(`/movie-list/`);

    setMovies(movieList.movies);
  }

  useEffect(() => {
    loadMovieList();
  },[]);

  return [movies];

}

export const useMovie = (id) => {
  const api = useApi();
  const [movie, setMovie] = useState([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadMovie() {
    const movieData = await api.get(`/movie/${id}/`);

    setMovie(movieData.movie);
    setSaved(movieData.saved)
    setLoading(false);
  }

  useEffect(() => {
    loadMovie();
  }, []);

  return [movie, saved, loading]
}
