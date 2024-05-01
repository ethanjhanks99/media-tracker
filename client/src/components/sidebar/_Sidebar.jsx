import { useState } from "react";
import { NavLink } from "react-router-dom"

export const Sidebar = (props) => {
  const pages = props.pages;

  return (
    <div className="sidebar">
      <div className="links">
        <ul>
        {
          pages.map((page) => {
            return (
              <li key={page.name}>
                <NavLink to={page.url} activeclassname="active"><strong>{page.name}</strong></NavLink>
              </li>
            )
          })
        }
        </ul>
      </div>
    </div>
  )
}
