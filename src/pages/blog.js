import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogItem from "../components/BlogItem"
import Social from "../components/social"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        edges {
          node {
            frontmatter {
              date(formatString: "MMMM Do YYYY")
              description
              path
              title
            }
            id
            timeToRead
            excerpt(pruneLength: 250)
          }
        }
      }
    }
  `)
  const blogPosts = data.allMdx.edges
  return (
    <Layout>
      <SEO title="Blog" />
      <div className="portfolio-container">
        {blogPosts.map(({ node: blogPost }) => (
          <BlogItem
            key={blogPost.id}
            title={blogPost.frontmatter.title}
            date={blogPost.frontmatter.date}
            path={blogPost.frontmatter.path}
            timeToRead={`${blogPost.timeToRead} mins`}
            excerpt={blogPost.excerpt}
          />
        ))}
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}
      >
        <Social />
      </div>
    </Layout>
  )
}

export default BlogPage
