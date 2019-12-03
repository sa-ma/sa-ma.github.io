import { Link } from "gatsby"
import React from "react"
import "./header.css"

const Header = () => (
  <header>
    <Link to="/" className="logo">
      S
    </Link>
    <nav>
      <Link to="/work"> Work</Link>
      <Link to="/blog"> Blog</Link>
    </nav>
  </header>
)
export default Header
