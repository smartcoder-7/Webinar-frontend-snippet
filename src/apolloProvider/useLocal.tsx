import gql from 'graphql-tag';
import useApolloEntity from '@src/hooks/useApolloEntity';

const BEGIN_VIMEO_UPLOAD = gql`
  mutation beginVimeoUpload($id: String!, $file: File!, $startVideoUploadInfo: StartVideoUploadInfoInput!) {
    beginVimeoUpload(id: $id, file: $file, startVideoUploadInfo: $startVideoUploadInfo) @client
  }
`;

const useLocal = () => {
  return useApolloEntity({
    useQuery: {},
    useMutation: {
      beginVimeoUpload: {
        mutation: BEGIN_VIMEO_UPLOAD,
      },
    },
  });
};

export default useLocal;
