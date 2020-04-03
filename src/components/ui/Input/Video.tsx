import { ReactComponent as Info } from '@src/images/info.svg';
import React, { SyntheticEvent } from 'react';
import css from '@emotion/css';
import Input from './index';

const videoIcon = require('@src/images/video2.svg').default;

interface VideoProps {
  className?: string;
  placeholder?: string;
  onVideoUploadStart: () => any;
  onChange?: (e: SyntheticEvent | string | File) => any;
  value?: string | File | undefined;
  disabled?: boolean;
  props: any;
}

const Video: React.FC<VideoProps> = ({
  className,
  placeholder,
  onVideoUploadStart,
  onChange,
  ...props
}: VideoProps) => {
  return (
    <>
      <div className='relative'>
        <Input
          {...props}
          placeholder={props.value instanceof File ? `File: ${props.value.name}.` : placeholder}
          className={className + ' pl-8'}
          css={css`
            padding-right: 8rem;
          `}
          onChange={onChange}
          value={props.value instanceof File ? '' : props.value}
        />
        <div className='absolute top-0 left-0 p-1 px-2 h-full flex items-center'>
          <img className='w-4 h-4' src={videoIcon} />
        </div>

        <div className='absolute top-0 right-0 p-1 px-2 h-full flex items-center text-gray-1'>
          <span>
            <span className='mx-2'>or</span>
            <label className='text-blue-3 cursor-pointer mr-1'>
              <input
                type='file'
                className='hidden'
                onChange={(e) => {
                  const files = e.target && e.target.files;
                  const file = files && files.length && files[0];

                  if (file) {
                    onChange && onChange(file);
                  }
                  return e;
                }}
              />
              Select a file
            </label>
          </span>
        </div>
      </div>

      <div className='text-gray-1 my-2 flex items-center'>
        <Info className='mr-2' /> We support YouTube, Vimeo and Amazon S3 links
      </div>
    </>
  );
};

export default Video;
