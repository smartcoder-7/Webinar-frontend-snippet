import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import fetch from "isomorphic-fetch"
import React, { ReactElement } from "react"
import resolvers from "./resolvers"
import typeDefs from "./typeDefs"
import config from '../config'


const httpLink = createHttpLink({
  uri: config.GRAPHQL_SERVER_URL,
  fetch,
  fetchOptions: {
    credentials: "include",
  },
})

const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  resolvers,
  typeDefs,
})

interface IProps {
  children: ReactElement
}

const EwApolloProvider = ({ children }: IProps) => {
  return (
    <ApolloProvider client={client}>
      {React.cloneElement(children)}
    </ApolloProvider>
  )
}

export default EwApolloProvider
