import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useApi } from "../../utils/api";
import { useShow } from "../../utils/use_show";

export const Show = () => {
  const { id } = useParams();
  const [showData, isSaved, loading] = useShow(id);
  const [saved, setSaved] = useState(isSaved);
  const api = useApi();

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  if (loading) return null;

  const save = async (e) => {
    e.preventDefault();

    api.post(`/show/${id}/`, {
      showId: showData.id,
      showTitle: showData.name,
      showPoster: `https://image.tmdb.org/t/p/original${showData.poster_path}`
    });
    setSaved(true);
  }

  const unsave = async (e) => {
    e.preventDefault();

    api.del(`/show/${id}/`);
    setSaved(false);
  }

  return (
    <>
      <div className="media-name">
        <h1>{showData.name}</h1>
      </div>
      <div className="media-info">
        <div>
          <img src={`https://image.tmdb.org/t/p/original${showData.poster_path}`} alt="Show Poster" className="page-image"/>
          {!saved && <button onClick={save}>Save</button>}
          {saved && <button onClick={unsave}>Unsave</button>}
        </div>
        <div className="information">
          <div className="overview">
            <h3>Overview</h3>
            {showData.overview}
          </div>
          <div className="genre">
            <h3>Genres</h3>
            {showData.genres.map((genre) => {
              return (
                <span key={genre.id} className="text">{genre.name}</span>
                )
              })}
          </div>
          <div>
            <h3>Number of Seasons/Episodes</h3>
            <span className="text">
              {showData.number_of_seasons}/{showData.number_of_episospan}
            </span>
          </div>
          <div className="production">
            <h3>Production Companies</h3>
            {showData.production_companies.map((company) => {
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