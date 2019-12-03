import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Social from "../components/social"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Samaila Bala" />
    <div className="hero">
      <h1 className="hero-title">
        Hi, I'm Samaila Bala and I'm a Frontend Developer
      </h1>
      <p className="hero-subtitle">
        During the day (and most nights to be honest{" "}
        <span role="img" aria-label="smile">
          🙂️
        </span>
        ) you can catch me{" "}
        <Link to="/projects" className="hero-links">
          building
        </Link>{" "}
        random things or{" "}
        <Link to="/blog" className="hero-links">
          writing
        </Link>{" "}
        about what I’ve learnt while listening to my beautiful well curated{" "}
        <a
          href="https://open.spotify.com/playlist/3hYOBbl0pKN39SWBZkLzPa?si=eIhMDIRtRparV5m7O7rXiw"
          className="hero-links"
          target="_blank"
          rel="noopener noreferrer"
        >
          playlist
        </a>
      </p>
      <Social />
    </div>
  </Layout>
)

export default IndexPage
