import { useParams } from "react-router";
import { useMovie } from "../../utils/use_movie";
import { useApi } from "../../utils/api";

export const Movie = () => {
  const { id } = useParams();
  const [movieData, loading] = useMovie(id);
  const api = useApi();

  if (loading) return null;

  async function save(e) {
    e.preventDefault();

    api.post(`/movie/${id}/`, {
      movieId: movieData.id,
      movieTitle: movieData.title,
      moviePoster: `https://image.tmdb.org/t/p/original${movieData.poster_path}`
    });
  }
  return (
    <>
      <h1>{movieData.title}</h1>
      <div>
        <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} alt="" />
      </div>
      <div className="information">
        <div className="overview">
          <h3>Overview</h3>
          {movieData.overview}
        </div>
        <div className="genre">
          <h3>Genre</h3>
          {movieData.genres.map((genre) => {
            return (
              <div key={genre.id} className="genre">{genre.name}</div>
              )
            })}
        </div>
        <div>
          <h3>Production Companies</h3>
          {movieData.production_companies.map((company) => {
            return (
              <div key={company.id}>
                <img src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt="" />
                <div className="name">
                {company.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <form onSubmit={save}>
        <button type="submit">Save Movie</button>
      </form>
    </>
  )
}