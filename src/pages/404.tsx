import Header from "@src/components/Header"
import { Text } from "@src/components/ui"
import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const NotFoundPage = ({ location }: any) => (
  <Layout isPublic={true} location={location}>
    <SEO title="404: Not found" />
    <div className=" h-screen">
      <div className="bg-white">
        <Header />
      </div>

      <div className="container p-12 mx-auto flex justify-center items-center">
        <div className="text-center">
          <Text.subhead
            className="text-gray-1 leading-none"
            css={{ fontSize: "16rem" }}
          >
            404
          </Text.subhead>
          <Text.subhead className="text-3xl text-gray-1">
            Page not found.
          </Text.subhead>
        </div>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
