import React, { ReactElement } from 'react';
// import Youtube from 'react-youtube'
import css from '@emotion/css';
import styled from '@emotion/styled';
import { ReactComponent as ImageUploadIcon } from '@src/images/imageUpload.svg';

import Upload, { Asset } from '@src/components/ui/Input/Upload';
import Form, { FormProps } from '@src/components/ui/Form';
import { PageBuilderModes } from '@src/sections/Dashboard/Webinar/Registration/index';
import ContentEditable from 'react-contenteditable';
import tw from 'tailwind.macro';
import { Input } from '@src/components/ui/Input';

const removeHTMLTag = (value: string) => {
  let validValue = '';
  if (value) {
    // Remove the HTML tag if the Value property includes it
    // When you input the URL value to this component, it will automatically
    // wrap your value with HTML 'a' tag
    // Example: Input https://www.youtube.com/watch?v=2MZ_oQOGC24 to this component
    // the output value should be: <a href="https://www.youtube.com/watch?v=2MZ_oQOGC24">https://www.youtube.com/watch?v=2MZ_oQOGC24</a>
    // Reference: Contenteditable HTML
    const htmlTagRemoveRegex = /(<([^>]+)>)/gi;
    validValue = value.replace(htmlTagRemoveRegex, '');
  }
  return validValue;
};

const ImageWithValue = ({ value, ...props }: any) => {
  // Regex to check if valid Youtube URL
  let validYoutubeLink = removeHTMLTag(value);
  const patt = new RegExp('^(https?://)?(www.youtube.com|youtu.?be)/.+$');
  if (patt.test(validYoutubeLink)) {
    validYoutubeLink = validYoutubeLink.replace('watch?v=', 'embed/');
    return (
      <iframe
        width='410'
        height='200'
        src={validYoutubeLink}
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      />
    );
  }
  return <img src={value} {...props} />;
};

interface ImageUploadProps {
  mode: PageBuilderModes;
  placeholder?: string;
  className?: string;
  asset: Asset;
  imgProps?: any;
}

const PageBuilderUpload: React.FC<ImageUploadProps> = (props) => {
  return (
    <Upload {...props} disabled={props.mode !== 'edit'}>
      <Upload.Loading />
      <Upload.Success>
        <ImageWithValue style={{ maxHeight: '100%', maxWidth: '100%' }} {...props.imgProps} />
      </Upload.Success>
      <Upload.Empty>
        {props.mode === 'edit' ? (
          props.placeholder || (
            <div className={`text-coral-1 text-center flex flex-col w-full items-center justify-center cursor-pointer`}>
              <ImageUploadIcon className='flex w-8 h-8' />
              <span className='max-w-48 p-2'>
                <span>
                  {/*Drag & drop an image or{" "}*/}
                  <span className='underline'>Drag & drop a featured image here. Or select a file to upload</span>
                </span>
              </span>
            </div>
          )
        ) : (
          <div />
        )}
      </Upload.Empty>
    </Upload>
  );
};

interface PageBuilderImageProps {
  asset: Asset;
  name: string;
  mode: PageBuilderModes;
  placeholder?: ReactElement;
  className?: string;
  setValue?: (source: string, value: string) => void;
  hasYoutubeLink?: boolean;
  imgProps?: any;
}

interface PageBuilderTextEditProps {
  value: any;
  onChange: any;
  mode: PageBuilderModes;
  defaultValue?: any;
  placeholder?: string;
  className?: string;
  offsetCss?: any;
}

interface EditableButtonProps {
  mode: PageBuilderModes;
  onClick?: any;
  name?: string;
  className?: string;
  'data-text'?: string;
}

interface PageBuilderComponent extends React.FC<FormProps> {
  Image: React.FC<PageBuilderImageProps>;
  TextEdit: React.FC<PageBuilderTextEditProps>;
  Avatar: React.FC<PageBuilderImageProps>;
  Button: React.FC<EditableButtonProps>;
}

const PageBuilder: PageBuilderComponent = (props) => {
  return props.children;
};

PageBuilder.Button = ({ onClick, mode, name, className, ...props }) => {
  return (
    <button
      // style={{
      //   backgroundColor: config.DEFAULT_PRIMARY_COLOR
      // }}
      disabled={mode === 'edit'}
      onClick={mode !== 'edit' ? onClick : null}
      className={`flex justify-center text-lg appearance-none outline-none rounded-full px-6 py-2 text-white ${className}`}
      {...props}
    >
      <Form.Field.Input
        name={name}
        data-text={props['data-text']}
        tagName='span'
        offsetCss={css`
          margin-left: -5px;
          margin-right: -5px;
          left: 0;
        `}
        mode={mode}
        disabled={mode !== 'edit'}
        component={PageBuilder.TextEdit}
        className='outline-none'
      />
    </button>
  );
};

PageBuilder.Image = ({ name, className, ...props }) => {
  const { mode } = props;

  return (
    <React.Fragment>
      <Form.Field.Input
        name={name}
        component={PageBuilderUpload}
        className={`flex object-cover ${mode === 'edit' ? 'border border-color-pagebuilder-frame rounded' : ''} ${
          className ? className : ''
        }`}
        css={css`
          ${mode === 'edit' ? 'position:relative; top:-5px; left:-5px;' : ''}
        `}
        {...props}
      />
      {props.hasYoutubeLink && (
        <Form.Field.Input
          name={name}
          mode={mode}
          placeholder='Or paste a URL here (Youtube link)'
          component={Input}
          className={mode !== 'edit' ? 'hidden' : 'px-6 text-lg outline-none mb-6 border-transparent text-red-600'}
          //className="px-6 text-lg outline-none mb-6 border-transparent text-red-600 "
        />
      )}
    </React.Fragment>
  );
};

PageBuilder.TextEdit = styled(
  ({ mode, ...props }) => {
    return (
      <ContentEditable
        {...props}
        mode={mode}
        disabled={mode !== 'edit'}
        css={[
          css`
            min-idth: '2rem';
          `,
          mode === 'edit' &&
            css`
              ${tw`
              border
              rounded
              border-color-pagebuilder-frame
              `}
            `,
          mode === 'edit' &&
            css`
              position: relative;
              left: -5px;
              padding-left: 5px;
              padding-right: 5px;
            `,
          mode === 'edit' && props.offsetCss,
          mode === 'edit' &&
            css`
              &:empty:not(:focus):before {
                opacity: 0.4;
                content: attr(data-text);
              }
            `,
        ]}
        // onBlur={e => {
        //   !e.target.innerText && props.onChange(props.defaultValue)
        // }}
        html={props.value || ''}
        onChange={props.onChange}
      />
    );
  },
  { shouldForwardProp: () => true }
)``;

const BackgroundImageWithValue = ({ value, ...props }: any) => (
  <div
    css={{
      backgroundImage: `url(${value})`,
    }}
    className='rounded-full bg-center bg-cover bg-red-200 border-4 border-white shadow w-16 h-16 mb-2'
    {...props}
  />
);

PageBuilder.Avatar = (props) => {
  return (
    <Upload avatar={true} {...props} disabled={props.mode !== 'edit'}>
      <Upload.Loading />
      <Upload.Success>
        <BackgroundImageWithValue />
      </Upload.Success>
      <Upload.Empty>
        {props.mode === 'edit' ? (
          <div className='rounded-full bg-white border-4 border-white shadow w-20 h-20 mb-2 flex justify-center items-center'>
            <ImageUploadIcon className='w-6 h-6' />
          </div>
        ) : (
          <div />
        )}
      </Upload.Empty>
    </Upload>
  );
};

export default PageBuilder;
