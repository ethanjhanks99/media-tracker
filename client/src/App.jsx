import { Outlet } from 'react-router'
import { useState, useEffect } from 'react';
import cookie from 'cookie';
import { SearchBar } from './SearchBar';

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
        <button onClick={logout}>Logout</button>
      </nav>
      <Outlet />
    </>
  )
}

export default App;
