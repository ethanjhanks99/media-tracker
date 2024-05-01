import { Outlet } from 'react-router'
import { useState, useEffect } from 'react';
import cookie from 'cookie';
import { SearchBar } from './components/search_bar/_SearchBar';
import { Link } from 'react-router-dom';
import { Sidebar } from './components/sidebar/_Sidebar';

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

  const pages = [
    {"name": "Home", "url": "/"},
    {"name": "Movies", "url": "/movies/"},
    {"name": "Shows", "url": "/shows/"},
    {"name": "My Saved", "url": "/user/"},
  ]

  return (
    <>
      <nav className='top-bar'>
        <h3>Media Tracker</h3>
        <SearchBar />
        <button onClick={logout}>Logout</button>
      </nav>
      <div className='bottom'>
        <div className='sticky-sidebar'>
          <Sidebar pages={pages} />
        </div>
        <div className='everything-else'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App;
