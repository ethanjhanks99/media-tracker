import { useState, useEffect } from "react";
import { useApi } from "./api";

export const useMovieList = () => {
  const api = useApi();
  const [movies, setMovies] = useState([]);

  const loadMovieList = async () => {
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

  const loadMovie = async () => {
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

export const useMovies = () => {
  const api = useApi();
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMovieLists = async () => {
    const movieData = await api.get('/movies/');

    setNowPlaying(movieData.nowPlaying.results);
    setUpcoming(movieData.upcoming.results);
    setPopular(movieData.popular.results);
    setLoading(false);
  }

  useEffect(() => {
    loadMovieLists();
  }, []);

  return [nowPlaying, upcoming, popular, loading];

}
