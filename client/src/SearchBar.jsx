import { useState } from "react";

export const SearchBar = () => {
  const [searchBar, setSearchBar] = useState("");

  const search = (e) => {
    e.preventDefault();

    setSearchBar("");
  }

  return (
    <div className="search-bar">
      <form onSubmit={search}>
        <input type="text" value={searchBar} onChange={(e) => setSearchBar(e.target.value)} placeholder="Search" />
        <button className="search">Search</button>
      </form>
    </div>
  )
}