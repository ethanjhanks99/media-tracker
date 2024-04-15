import { useState, useEffect } from "react";
import { useApi } from "./api";

export const useMovieList = () => {
  const api = useApi();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  async function loadMovieList() {
    const movieList = await api.get(`/movie-list/${page}`);

    setMovies(movieList.movies);
    setLoading(false);
  }

  const nextPage = () => {
    setPage(() => {
      return page + 1;
    });
  }

  const prevPage = () => {
    setPage(() => {
      return page - 1;
    });
  }


  useEffect(() => {
    loadMovieList();
  }, [page]);


  return [movies, nextPage, prevPage, loading, page];

}