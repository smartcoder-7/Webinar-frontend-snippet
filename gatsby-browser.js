/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import EwApolloProvider from "./src/apolloProvider/EwApolloProvider"

export const wrapRootElement = ({ element }) => (
  <EwApolloProvider>{element}</EwApolloProvider>
)
