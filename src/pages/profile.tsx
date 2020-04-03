import React from "react"

import Layout from "../components/Layout"
import Profile from "@src/sections/Profile"

const profile = ({ location }: any) => (
  <Layout location={location}>
    <Profile />
  </Layout>
)

export default profile
