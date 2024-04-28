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
      <h3>{showData.name}</h3>
      <div>
        <img src={`https://image.tmdb.org/t/p/original${showData.poster_path}`} alt="Show Poster" />
      </div>
      {!saved && <button onClick={save}>Save Show</button>}
      {saved && <button onClick={unsave}>Unsave</button>}
    </>
  )

}