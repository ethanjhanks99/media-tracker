import { useState } from "react";
import { useParams } from "react-router";

export const Search = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <h1>Hello Search!!!</h1>
    </div>
  )
}
