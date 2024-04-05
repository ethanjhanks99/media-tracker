import { useEffect, useState } from "react";
import { useApi } from "./api";

export const useGroceryLists = () => {
  const api = useApi();
  const [groceryLists, setGroceryLists] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadGroceryLists() {
    const {groceryLists} = await api.get("/grocery_lists/");
    setGroceryLists(groceryLists);
    setLoading(false);
  }

  useEffect(() => {
    loadGroceryLists();
  }, []);

  return [groceryLists, loading];
}