import React from "react"

import Layout from "../components/Layout"
import Login from "../sections/Login"

const login = ({ location }: any) => (
  <Layout location={location}>
    <Login />
  </Layout>
)

export default login
