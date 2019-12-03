import React from "react"

import Github from "../images/social/GitHub.svg"
import Gmail from "../images/social/Gmail.svg"
import LinkedIn from "../images/social/LinkedIn.svg"
import Twitter from "../images/social/Twitter.svg"

const Social = () => {
  return (
    <div className="social-icons">
      <a
        href="https://github.com/sa-ma"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Github} style={{ marginRight: "0" }} alt="github" />
      </a>
      <a
        href="https://www.linkedin.com/in/samabalap/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={LinkedIn} alt="linkedin" />
      </a>
      <a
        href="https://twitter.com/samabalap"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Twitter} alt="twitter" />
      </a>
      <a
        href="mailto:samailabalap@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Gmail} alt="gmail" />
      </a>
    </div>
  )
}

export default Social
