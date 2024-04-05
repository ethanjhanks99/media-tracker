import { useEffect, useState } from "react";
import { useApi } from "./api";

export const useGroceryList = (id) => {
  const api = useApi();
  const [groceryList, setGroceryList] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadGroceryList() {
    const {groceryList} = await api.get(`/grocery_lists/${id}`);
    setGroceryList(groceryList);
    setLoading(false);
  }

  useEffect(() => {
    loadGroceryList();
  }, []);

  return [groceryList, loading];
}