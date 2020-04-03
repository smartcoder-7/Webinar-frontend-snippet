import { getVimeoVideoId } from '@src/utils/getVimeoVideoId';
import gql from 'graphql-tag';
import tus from 'tus-js-client';
import { EWebinarFragment, StartVideoUploadInfo } from '@src/fromBackend/schema';
import config from '@src/config';

const fragment = gql`
  fragment vimeoUpload on EWebinar {
    __typename
    id
    vimeoVideoId

    uploadStatus {
      __typename
      stage
      localUpload
      progress
      done
      error
    }
  }
`;

const vimeoVideoType: String = 'EWebinar';

const mapToRange = (
  x: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export interface BeginVimeoUploadInput {
  id: string;
  file: File;
  startVideoUploadInfo: StartVideoUploadInfo;
}

const resolvers = {
  Mutation: {
    beginVimeoUpload: async (
      _root: any,
      variables: BeginVimeoUploadInput,
      { client, getCacheKey }: any
    ): Promise<boolean> => {
      // Prompt user before tab close
      window.onbeforeunload = () => {
        return true;
      };

      try {
        const { file, startVideoUploadInfo } = variables;

        const id = getCacheKey({
          __typename: vimeoVideoType,
          id: variables.id,
        });

        const upload = new tus.Upload(file, {
          endpoint: `${config.VIMEO_BASE_URL}/me/videos`,
          uploadUrl: startVideoUploadInfo.uploadLink,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          metadata: {
            filename: file.name,
            filetype: file.type,
          },
          headers: {},
          onError: (error) => {
            console.error(error);
          },
          onProgress: (bytesUploaded: number, bytesTotal: number) => {
            const percentage = Math.round((bytesUploaded / bytesTotal) * config.UPLOAD_PROGRESS_MAX);

            const ewebinarData = client.readFragment({
              fragment,
              id: variables.id,
            });
            const data: EWebinarFragment = {
              ...ewebinarData,
              __typename: vimeoVideoType,
              id: variables.id,
              vimeoVideoId: getVimeoVideoId(startVideoUploadInfo.videoUri),
              uploadStatus: {
                __typename: 'UploadStatus',
                stage: 'Uploading',
                localUpload: true,
                progress: mapToRange(percentage, 0, 100, 0, 75),
                done: false,
                error: null,
              },
            };

            const update = client.writeData({
              id,
              data,
            });
            console.log('Updating status from local responder', {
              ewebinarData,
              id,
              data,
              update,
              variables: variables,
            });
          },
          onSuccess: async () => {
            // Remove navigation prompt
            window.onbeforeunload = null;
            await client.mutate({
              variables: {
                id: variables.id,
                data: {
                  vimeoVideoId: getVimeoVideoId(startVideoUploadInfo.videoUri),
                  vimeoVideoUri: startVideoUploadInfo.videoUri,
                },
              },
              mutation: gql`
                mutation localVimeoUploadDone($id: String!, $data: SetLocalVimeoUploadDoneInput!) {
                  setLocalVimeoUploadDone(id: $id, data: $data) {
                    id
                    title
                    vimeoVideoId
                    thumbnail
                    uploadStatus {
                      stage
                      localUpload
                      done
                      progress
                      error
                    }
                  }
                }
              `,
            });
          },
        });

        // start video upload
        upload.start();
      } catch (e) {
        // Remove navigation prompt
        window.onbeforeunload = null;
        console.error(e);
      }

      return true;
    },
  },
};

export default resolvers;
