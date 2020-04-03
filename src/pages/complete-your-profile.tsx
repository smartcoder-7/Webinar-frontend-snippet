import React from "react"

import Layout from "../components/Layout"
import CompleteYourProfile from "@src/sections/CompleteYourProfile"

const completeProfile = ({ location }: any) => (
  <Layout isPublic={false} location={location}>
    <CompleteYourProfile location={location} />
  </Layout>
)

export default completeProfile
