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
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadShow() {
    const showData = await api.get(`/show/${id}/`);

    setShow(showData.show);
    setSaved(showData.saved);
    setLoading(false);
  }

  useEffect(() => {
    loadShow();
  }, []);

  return [show, saved, loading];

}

export const useShows = () => {
  const api = useApi();
  const [nowAiring, setNowAiring] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadShowLists = async () => {
    const showData = await api.get('/shows/');

    setNowAiring(showData.nowAiring.results);
    setOnAir(showData.onAir.results);
    setTopRated(showData.topRated.results);
    setLoading(false);
  }

  useEffect(() => {
    loadShowLists();
  }, []);

  return [nowAiring, onAir, topRated, loading];

}