import gql from 'graphql-tag';
import useApolloEntity from './useApolloEntity';

const UPDATE_TRANSCODE_STATUS = gql`
  mutation setLocalVimeoUploadDone($id: String!, $data: SetLocalVimeoUploadDoneInput!) {
    setLocalVimeoUploadDone(id: $id, data: $data) {
      id
      uploadStatus {
        done
        progress
        localUpload
        stage
        error
      }
    }
  }
`;

const TRANSFER_VIDEO = gql`
  mutation transferVideo($id: String!, $data: UploadVideoInput!) {
    uploadVideo(id: $id, data: $data)
  }
`;

const GET_SCRAPED_VIDEO = gql`
  mutation scrapeVideoMetaFromURL($url: String!) {
    scrapeVideoMetaFromURL(url: $url) {
      url
      title
    }
  }
`;

export const START_VIDEO_UPLOAD = gql`
  mutation startVideoUpload($fileSize: Float!, $fileName: String!) {
    startVideoUpload(fileSize: $fileSize, fileName: $fileName) {
      uploadLink
      videoUri
    }
  }
`;

const useVimeoUpload = () => {
  const VimeoUpload = useApolloEntity({
    useQuery: {},
    useMutation: {
      uploadVideo: {
        mutation: TRANSFER_VIDEO,
      },
      updateTranscodeStatus: {
        mutation: UPDATE_TRANSCODE_STATUS,
      },
      scrape: {
        mutation: GET_SCRAPED_VIDEO,
      },
    },
  });

  return VimeoUpload;
};

export default useVimeoUpload;
