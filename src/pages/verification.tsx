import React from "react"

import Layout from "../components/Layout"
import Verification from "@src/sections/Verification"

const verify = ({ location }: any) => (
  <Layout isPublic={true} location={location}>
    <Verification />
  </Layout>
)

export default verify