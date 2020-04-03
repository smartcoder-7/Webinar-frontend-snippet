import gql from "graphql-tag"

const typeDefs = gql`
  input File {
    name: String
    size: Int
    type: String
  }

  input StartVideoUploadInfoInput {
    uploadLink: String
    videoUri: String
  }

  extend type Mutation {
    beginVimeoUpload(id: String!, file: File!, startVideoUploadInfo: StartVideoUploadInfoInput): Boolean
  }
`

export default typeDefs
