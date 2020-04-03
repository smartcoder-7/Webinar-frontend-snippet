import React from 'react';
import css from '@emotion/css';
import { Link } from '@reach/router';
import VideoPreview from '@src/components/VideoPreview';
import useLocalStorage from '@src/hooks/useLocalStorage';
import { ReactComponent as CloseIcon } from '@src/images/close.svg';
import { EWebinarDescriptionFragment } from '@src/fromBackend/schema';

const UploadProgress: React.FC<{ ewebinar: EWebinarDescriptionFragment }> = ({ ewebinar }) => {
  const [isOpen, setIsOpen] = useLocalStorage(`UploadProgress_isOpen_${ewebinar.id}`, true);

  if (!isOpen) return null;
  if (!ewebinar.uploadStatus) return null;

  const { progress, stage, done, error } = ewebinar.uploadStatus;

  return (
    <div className='fixed subtitle mr-5 mb-6 bottom-0 right-0 z-progress'>
      <div
        className='bg-white rounded-lg border border-gray-2 shadow-lg inline-flex relative'
        css={css`
          width: 22rem;
          height: 6rem;
        `}
      >
        {done && (
          <div className='absolute top-0 right-0 p-3'>
            <button onClick={() => setIsOpen(false)} className='appearence-none focus:outline-none'>
              {' '}
              <CloseIcon className='h-3 w-3' />
            </button>
          </div>
        )}
        <div className='w-1/3 rounded-l-lg border-r border-gray-300 overflow-hidden'>
          <VideoPreview percentOnly ewebinar={ewebinar} />
        </div>
        <div className='content p-6 w-2/3 self-center'>
          {done && error && <span className='text-coral-1'>{error}</span>}

          {done && !error && (
            <div className='flex flex-col justify-end h-full'>
              <div>Upload completed! </div>
              <div>
                <Link className='text-blue-3' to={`/portal/webinar/${ewebinar.id}/interactions`}>
                  Take a look...
                </Link>
              </div>
            </div>
          )}

          {!done && (
            <React.Fragment>
              <div className='text-gray-13 pb-2'>{stage} your video...</div>
              <div className='bg-gray-6 h-2 w-full rounded-full'>
                <div className='bg-teal-5 h-full rounded-full' style={{ width: `${progress}%` }} />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;
