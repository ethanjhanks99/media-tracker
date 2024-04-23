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

export const useShow = (id) => {
  const api = useApi();
  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadShow() {
    const showData = await api.get(`/show/${id}/`);

    setShow(showData.show);
    setLoading(false);
  }

  useEffect(() => {
    loadShow();
  }, []);

  return [show, loading];

}