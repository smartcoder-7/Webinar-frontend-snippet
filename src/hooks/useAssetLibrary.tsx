import gql from "graphql-tag"
import useApolloEntity from "./useApolloEntity"



const CREATE_UPLOAD_URL = gql`
  mutation createUploadUrl($data: CreateUploadUrlInput!) {
    createUploadUrl(data: $data) {
      url
      uploadUrl
    }
  }
`

const useAssetLibrary = () => {
  const assetLibSvc = useApolloEntity({
    useMutation: {
      createUploadUrl: {
        mutation: CREATE_UPLOAD_URL
      },
    },
  })

  return assetLibSvc
}

export default useAssetLibrary
