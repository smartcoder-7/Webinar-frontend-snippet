import React from "react"

import Layout from "../components/Layout"
import WebinarPublic from "../sections/WebinarPublic"

const webinar = ({ location }: any) => (
  <Layout isPublic={true} location={location}>
    <WebinarPublic />
  </Layout>
)

export default webinar
