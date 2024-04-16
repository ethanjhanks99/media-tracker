import { useState, useEffect } from "react";
import { useApi } from "./api";

export const useShowList = () => {
  const api = useApi();
  const [shows, setShows] = useState([]);

  async function loadShowList() {
    const showList = await api.get(`/show-list/`);

    setShows(showList.shows);
  }

  useEffect(() => {
    loadShowList();
  },[]);

  return [shows];
}