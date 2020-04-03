import React from "react"

import Layout from "../components/Layout"
import Portal from "../sections/Dashboard"

const portal = ({ location }: any) => (
  <Layout location={location}>
    <Portal />
  </Layout>
)

export default portal
