import React from "react"
import Img from "gatsby-image"
import "./portfolioItem.css"

const PortfolioItem = ({ title, url, image, description, technology }) => {
  return (
    <div className="portfolio-item">
      <div className="portfolio-info">
        <h3 className="portfolio-title"> {title} </h3>
        <p className="portfolio-description">{description}</p>

        <h4 className="portfolio-technology-title"> Technology Used </h4>
        <p>{technology}</p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-link"
        >
          View Project
        </a>
      </div>
      <div className="portfolio-image" style={{ width: "100%" }}>
        <Img fluid={image} alt={title} />
      </div>
    </div>
  )
}

export default PortfolioItem
