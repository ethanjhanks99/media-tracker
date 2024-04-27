import { useState } from "react";
import { Link } from "react-router-dom";


export const SearchBar = () => {
  const [searchBar, setSearchBar] = useState("");
  const [query, setQuery] = useState("");
  

  const addQuery = (e) => {
    setSearchBar(e.target.value);

    const search = e.target.value.split(" ");
    setQuery((newQuery) => {
      newQuery = search[0];
      for (let i = 1; i < search.length; i++) {
        newQuery += "+" + search[i];
      }
      return newQuery;
    });
  }

  return (
    <div className="search-bar">
      <form>
        <input type="text" value={searchBar} onChange={addQuery} placeholder="Search" />
        <Link to={"/search/" + query}>
        <button className="search">Search</button>
        </Link>
      </form>
    </div>
  )
}