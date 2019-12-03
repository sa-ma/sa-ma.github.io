import React from "react"
import { Link } from "gatsby"
import "./blogitem.css"

const BlogItem = ({ title, date, path, timeToRead, excerpt }) => {
  return (
    <article className="post-article">
      <Link to={path} className="post-title">
        <h2 className="post-title">{title}</h2>
      </Link>
      <div className="post-sub">
        <span className="post-date">{date}</span>
        <span className="time-to-read">{timeToRead}</span>
      </div>
      <p className="post-short-description">{excerpt}</p>
      <a href={path} className="read-more">
        Read more
      </a>
    </article>
  )
}

export default BlogItem
