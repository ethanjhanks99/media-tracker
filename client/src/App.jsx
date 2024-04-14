import { Outlet } from 'react-router'
import { useState, useEffect } from 'react';

function App() {

  const [user, setUser] = useState(null);

  async function getUser() {
    const res = await fetch('/me/', {
      credentials: "same-origin",
    });
    const body = await res.json();
    setUser(body.user);
  }

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

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <div>hello {user && user.first_name}</div>
      <nav><button onClick={logout}>Logout</button></nav>
    </>
  )
}

export default App;
