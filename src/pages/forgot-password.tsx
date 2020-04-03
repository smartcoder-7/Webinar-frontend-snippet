import React from "react"

import Layout from "../components/Layout"
import ForgotPassword from "@src/sections/ForgotPassword"

const dashboard = ({ location }: any) => (
  <Layout isPublic={true} location={location}>
    <ForgotPassword />
  </Layout>
)

export default dashboard
