import { withProperties } from '@src/utils/type';
import React from 'react';
import useAssetLibrary from '../../../hooks/useAssetLibrary';
import { PageBuilderModes } from '@src/sections/Dashboard/Webinar/Registration';

// import fetch from "isomorphic-fetch"
// https://medium.com/@blackwright/browser-file-uploads-to-s3-using-fetch-46a53d106e11

const Child = ({ componentName, children, ...props }: any) => {
  return (
    <React.Fragment>
      {React.Children.toArray(children)
        .filter((child: any) => child.type.name === componentName)
        .map((element: any) => React.cloneElement(element, props))}
    </React.Fragment>
  );
};

export interface Asset {
  scope: 'ewebinar' | 'user' | 'team';
  id: string;
  name: string;
}

interface UploadProps {
  asset: Asset;
  avatar?: boolean;
  className?: string;
  disabled?: boolean;
  mode?: PageBuilderModes;
}

const Upload: React.FC<UploadProps> = ({ className, asset, ...props }: any) => {
  const [loading, setLoading] = React.useState(false);
  const assetLibSvc = useAssetLibrary();

  if (!asset) {
    console.error('No ASSET specified in Upload element');
  }

  return (
    <label className={`relative inline-block p-1 ${className}`}>
      <input
        disabled={props.disabled}
        type='file'
        className='hidden'
        onChange={async (e: any) => {
          const files = e.target.files;
          const file = files.length && files[0];
          try {
            if (file) {
              setLoading(true);

              const response = await assetLibSvc.createUploadUrl({
                data: {
                  scope: asset.scope,
                  id: asset.id,
                  name: asset.name,
                  fileType: file.type,
                },
              });
              const { url, uploadUrl } = response.data.createUploadUrl;

              await fetch(uploadUrl, {
                method: 'PUT',
                body: file,
                headers: {
                  'Content-Type': file.type,
                  'x-amz-acl': 'public-read',
                },
              });

              props.onChange(url);
              setLoading(false);
            }
          } catch (e) {
            setLoading(false);
          }
        }}
      />

      {loading && <Child children={props.children} componentName='Loading' />}

      {!props.value && !loading && props.mode === 'edit' && (
        <React.Fragment>
          <Child children={props.children} componentName='Empty' />
          {props.avatar && !props.disabled && (
            <div className='cursor-pointer outline-none appearence-none shadow absolute bg-coral-1 top-0 right-0 rounded-full w-6 h-6 -mt-9 -mr-9 flex items-center justify-center text-white text-xl'>
              +
            </div>
          )}
        </React.Fragment>
      )}

      {props.value && !loading && (
        <React.Fragment>
          <Child
            children={props.children}
            value={props.value}
            {...props.imgProps}
            componentName='Success'
          />
          {props.mode === 'edit' && (
            <button
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();
                props.onChange(''); // This can't be NULL - must be empty string for the value to be sent to graphQL.
              }}
              className='cursor-pointer outline-none appearence-none shadow absolute bg-coral-1 top-0 right-0 rounded-full w-5 h-5 -mt-3 -mr-3 flex items-center justify-center text-white text-xs'
            >
              ✕
            </button>
          )}
        </React.Fragment>
      )}
    </label>
  );
};

const Success: any = ({ children, ...props }: any) => (
  <div>{React.cloneElement(children, props)}</div>
);
// React.Children.toArray(children).map(element =>
//   React.cloneElement(element, props)
// )

const Loading = ({ children, ...props }: any) => {
  return (
    <div className='h-full w-full flex justify-center'>
      {children ? (
        React.cloneElement(children, props)
      ) : (
        <img className='flex w-10' src={require('@src/images/spinner.svg').default} />
      )}
    </div>
  );
};

const Empty = ({ children, ...props }: any) => (
  <div className='h-full w-full flex'>{React.cloneElement(children, props)}</div>
);

export default withProperties(Upload, { Success, Empty, Loading });
