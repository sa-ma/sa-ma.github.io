import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PortfolioItem from "../components/PortfolioItem"

const PortfolioPage = () => {
  const data = useStaticQuery(graphql`
    {
      allProjectsJson {
        edges {
          node {
            title
            url
            description
            technology
            id
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)

  const portfolios = data.allProjectsJson.edges

  return (
    <Layout>
      <SEO title="Portfolio" />
      <div className="portfolio-container">
        {portfolios.map(({ node: portfolio }) => {
          const title = portfolio.title
          const url = portfolio.url
          const image = portfolio.image.childImageSharp.fluid
          const description = portfolio.description
          const technology = portfolio.technology
          const id = portfolio.id
          return (
            <PortfolioItem
              key={id}
              title={title}
              url={url}
              image={image}
              description={description}
              technology={technology}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default PortfolioPage
