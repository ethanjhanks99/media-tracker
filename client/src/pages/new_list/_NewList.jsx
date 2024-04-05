import { useState } from "react";
import cookie from "cookie";
import { useNavigate } from "react-router";
import { useApi } from "../../utils/api";

export const NewList = () => {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const navigate = useNavigate();
  const api = useApi();

  function addItem() {
    if (!items.includes(currentItem)) {
      setItems([...items, currentItem]);
    };
    setCurrentItem("");
  }

  function removeItem(item) {
    setItems(items.filter(i => i != item))
  }

  async function saveList(e) {
    e.preventDefault();

    await api.post("/grocery_lists/", {
      name,
      items
    });

    navigate(-1);
  }

  return (
    <form onSubmit={saveList}>
      <div>
        Name
      </div>
      <input value={name} onChange={e => setName(e.target.value)}/>
      <div>
        {
          items.map(item => (
            <div key={item}>
              {item}
              <button type="button" onClick={() => removeItem(item)}>Delete</button>
            </div>
          ))
        }
      </div>
      <div>
        Add Item
      </div>
      <div>
        <input
          value={currentItem}
          onChange={e => setCurrentItem(e.target.value)}
        />
        <button type="button" onClick={addItem}>+Add</button>
      </div>
      <button>Save</button>
    </form>
  )
}