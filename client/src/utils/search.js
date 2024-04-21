import { useState, useEffect } from "react";
import { useApi } from "./api";

export const useSearch = (query) => {
  const api = useApi();

  query = query.split(" ");
  good_query = query[0];
  for (let i = 1; i < query.length; i++) {
    good_query += "+" + query[i];
  }

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadResults() {
    const resultData = await api.get('/search/' + good_query);

    setResults([{"movies": resultData.movies}, {"shows": resultData.shows}, {"games": resultData.games}]);
    setLoading(false);
  }

  useEffect(() => {
    loadResults();
  }, []);

  return [results, loading];
}
