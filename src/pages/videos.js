import { Link } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const VideoPage = () => (
  <Layout pageInfo={{ pageName: "videoPage" }}>
    <SEO title="Videos" />
    <h1>Hi from the video page</h1>
    <p>Welcome to the video page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default VideoPage
