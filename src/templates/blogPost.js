import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import "../components/BlogItem/blogitem.css"
import SEO from "../components/seo"
import Social from "../components/social"

// import backArrow from '../images/back-arrow.svg'

const BlogTemplate = ({ data }) => {
  const post = data.mdx

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="portfolio-container">
        <article className="post-article">
          <h1 className="post-title">{post.frontmatter.title}</h1>

          <div className="post-sub">
            <span className="post-date">{post.frontmatter.date}</span>
            <span className="time-to-read">{`${post.timeToRead} min`}</span>
          </div>
          <div className="post-short-description">
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
        </article>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}
      >
        <Social />
      </div>
    </Layout>
  )
}

export const postquery = graphql`
  query BlogPostByPath($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      id
      frontmatter {
        path
        title
        date(formatString: "MMMM Do YYYY")
      }
      timeToRead
    }
  }
`
export default BlogTemplate
