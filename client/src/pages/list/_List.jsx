import { useParams } from "react-router"
import { useGroceryList } from "../../utils/use_grocery_list";

export const List = () => {
  const {id} = useParams();
  const [groceryList, loading] = useGroceryList(id);

  return (
    <h1>Build me</h1>
  )
}