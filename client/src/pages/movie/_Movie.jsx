import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMovie } from "../../utils/use_movie";
import { useApi } from "../../utils/api";

export const Movie = () => {
  const { id } = useParams();
  const [movieData, isSaved, loading] = useMovie(id);
  const [saved, setSaved] = useState(isSaved)
  const api = useApi();

  useEffect(() => {
    setSaved(isSaved)
  }, [isSaved]);

  if (loading) return null;

  async function save(e) {
    e.preventDefault();

    api.post(`/movie/${id}/`, {
      movieId: movieData.id,
      movieTitle: movieData.title,
      moviePoster: `https://image.tmdb.org/t/p/original${movieData.poster_path}`
    });
    setSaved(true);
  }

  const unsave = async (e) => {
    e.preventDefault();

    api.del(`/movie/${id}/`);
    setSaved(false);
  }

  return (
    <>
      <div className="media-name">
        <h1>{movieData.title}</h1>
      </div>
      <div className="media-info">
        <div>
          <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} alt="" className="page-image"/>
          {!saved && <button onClick={save}>Save</button>}     
          {saved && <button onClick={unsave}>Unsave</button>}
        </div>
        <div className="information">
          <div className="overview">
            <h3>Overview</h3>
            {movieData.overview}
          </div>
          <div className="genre">
            <h3>Genres</h3>
            {movieData.genres.map((genre) => {
              return (
                <span key={genre.id} className="text">{genre.name}</span>
                )
              })}
          </div>
          <div>
            <h3>Runtime</h3>
            <span className="text">{movieData.runtime} minutes</span>
          </div>
          <div>
            <h3>Production Companies</h3>
            {movieData.production_companies.map((company) => {
              return (
                <div key={company.id}>
                  <span className="text">
                    {company.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}