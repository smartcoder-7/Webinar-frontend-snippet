import React from "react"

import Layout from "../components/Layout"
import { Signup } from "../sections/Signup"

const register = ({ location }: any) => (
  <Layout isPublic={true} location={location}>
    <Signup />
  </Layout>
)

export default register
