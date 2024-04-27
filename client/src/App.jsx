import { Outlet } from 'react-router'
import { useState, useEffect } from 'react';
import cookie from 'cookie';
import { SearchBar } from './components/search_bar/_SearchBar';
import { Link } from 'react-router-dom';

function App() {

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  return (
    <>
      <nav className='top-bar'>
        <h3>Media Tracker</h3>
        <SearchBar />
        <Link to={"/user/"}><button>Saved</button></Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <Outlet />
    </>
  )
}

export default App;
