import { useParams } from "react-router";
import { useApi } from "../../utils/api";
import { useShow } from "../../utils/use_show";

export const Show = () => {
  const { id } = useParams();
  const [showData, loading] = useShow(id);
  const api = useApi();

  if (loading) return null;

  async function save(e) {
    e.preventDefault();

    api.post(`/show/${id}/`, {
      showId: showData.id,
      showTitle: showData.name,
      showPoster: `https://image.tmdb.org/t/p/original${showData.poster_path}`
    });
  }

  const unsave = async (e) => {
    e.preventDefault();

    api.del(`/show/${id}/`);
  }

  return (
    <>
      <h3>{showData.name}</h3>
      <div>
        <img src={`https://image.tmdb.org/t/p/original${showData.poster_path}`} alt="Show Poster" />
      </div>
      <form onSubmit={save}>
        <button>Save Show</button>
      </form>
      <button onClick={unsave}>Unsave</button>
    </>
  )

}