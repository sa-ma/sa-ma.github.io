import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import NotFound from "../images/404.svg"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="not-found-container">
      <img src={NotFound} alt="not found" />
      <p>
        There is nothing here for now. <Link to="/">Go back Home</Link>
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
