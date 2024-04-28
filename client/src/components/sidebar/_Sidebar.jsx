import { useState } from "react"
import { Link } from "react-router-dom"

export const Sidebar = (props) => {
  const pages = props.pages;

  return (
    <div className="sidebar">
      <ul>
      {
        pages.map((page) => {
          return (
            <li key={page.name}>
              <Link to={page.url}>{page.name}</Link>
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}
