import React from "react"

import Layout from "../components/Layout"
import Unsubscribe from "@src/sections/Unsubscribe"

const unsubscribe = ({ location }: any) => (
  <Layout isPublic={true} location={location}>
    <Unsubscribe location={location} />
  </Layout>
)

export default unsubscribe