import { Outlet } from 'react-router'
import { useState, useEffect } from 'react';
import cookie from 'cookie';

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
      <nav><button onClick={logout}>Logout</button></nav>
      <Outlet />
    </>
  )
}

export default App;
