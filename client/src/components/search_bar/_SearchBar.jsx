import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const SearchBar = () => {
  const [searchBar, setSearchBar] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  

  const addQuery = (e) => {
    setSearchBar(e.target.value);

    const search = e.target.value.split(" ");
    setQuery((newQuery) => {
      newQuery = search[0];
      for (let i = 1; i < search.length; i++) {
        newQuery += `+${search[i]}`;
      }
      return newQuery;
    });
  }

  const submitSearch = (e) => {
    e.preventDefault();

    setSearchBar("");
    navigate(`/search/${query}`);
  }

  return (
    <div className="search-bar">
      <form onSubmit={submitSearch}>
        <input type="text" value={searchBar} onChange={addQuery} placeholder="Search" />
        <button className="search">Search</button>
      </form>
    </div>
  )
}