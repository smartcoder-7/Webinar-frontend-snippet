import VimeoPlayer from '@src/components/VimeoPlayer';
import React from 'react';
import { EWebinarDescriptionFragment } from "@src/fromBackend/schema"

interface VideoPreviewProps {
  ewebinar: EWebinarDescriptionFragment;
  thumbnailOnly?: boolean;
  progressOnly?: boolean;
  percentOnly?: boolean;
}

const VideoPreview = ({
  ewebinar,
  thumbnailOnly,
  progressOnly,
  percentOnly,
}: VideoPreviewProps) => {
  const { uploadStatus, vimeoVideoId, thumbnail } = ewebinar;

  if (!uploadStatus) return null;

  const { progress, stage, done, error } = uploadStatus;

  // get video upload sttaus

  // get ewebinar if id is provided

  // get video upload variables

  // get ewebinar video id

  return (
    <div
      style={{ backgroundImage: `url(${thumbnail})` }}
      className='relative inline-block w-full h-full  bg-center bg-cover bg-gray-600'
    >
      <>
        {vimeoVideoId && !thumbnailOnly && !progressOnly && !percentOnly ? (
          <VimeoPlayer videoId={vimeoVideoId} />
        ) : (
          <>
            {!done && (
              <>
                <div
                  className={`h-full w-full flex justify-center items-center ${!thumbnailOnly &&
                    'pb-8'}`}
                  style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                >
                  <img className='w-10 m-10' src={require('@src/images/spinner.svg').default} />
                </div>
                {!thumbnailOnly && !percentOnly && (
                  <div className='absolute bottom-0 w-full h-8'>
                    <div className='bg-gray-600 h-full bottom-0 w-full absolute'>
                      <div className='absolute mx-auto leading-none px-2 flex items-center justify-between h-full w-full text-white text-sm'>
                        <div>{stage}... </div>
                        <div>{progress}%</div>
                      </div>
                      <div className='h-full bg-blue-2' style={{ width: progress + '%' }} />
                    </div>
                  </div>
                )}
                {!thumbnailOnly && percentOnly && (
                  <div className='absolute bottom-0 w-full h-6'>
                    <div className='bg-gray-600 opacity-30 h-full bottom-0 w-full absolute'>
                      <div className='absolute leading-none px-2 flex items-center h-full w-full text-white text-sm'>
                        <div className='mx-auto'>{progress}%</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {error && !thumbnailOnly && (
              <div className='absolute bottom-0 w-full h-6'>
                <div className='bg-red-700 h-full bottom-0 w-full absolute'>
                  <div className='absolute leading-none px-2 flex items-center h-full w-full text-white text-sm'>
                    <div className='mx-auto'>{error}</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default VideoPreview;
