import styled from '@emotion/styled';

import ApolloForm from '@src/components/ApolloForm';
import { Form, Input, Text } from '@src/components/ui';
import useEWebinar from '@src/hooks/useEWebinar';
//@ts-ignore
import ColorThief from 'colorthief';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

import ThemesSelectInput from './ThemesSelectInput';

const validationSchema = yup.object().shape({
  primaryColor: yup
    .string()
    .required()
    .nullable(),
  font: yup
    .string()
    .required()
    .nullable(),
  logoMediaUrl: yup
    .string()
    .url()
    .nullable(),
});

interface ThemeOptionsProps {}

const rgbToHex = (color = [0, 0, 0]) => {
  const [r, g, b] = color;
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};

const useColorThief = (logoMediaUrl: string) => {
  const [extractedColor, setExtractedColor] = React.useState();

  React.useEffect(() => {
    const image = new Image();
    function extractColor(): void {
      const colorThief = new ColorThief();
      const newExtractedColor = colorThief.getColor(image);
      setExtractedColor(newExtractedColor);
    }

    image.addEventListener('load', extractColor);
    image.crossOrigin = 'Anonymous';
    image.setAttribute('src', logoMediaUrl);
  }, [logoMediaUrl]);

  return rgbToHex(extractedColor);
};

export const ThemeOptions: React.FC<ThemeOptionsProps> = () => {
  const { watch, setValue } = useFormContext();
  const themeName = watch('theme');
  const logoMediaUrl = watch('logoMediaUrl');
  const extractedColor = useColorThief(logoMediaUrl);

  console.log({ themeName, logoMediaUrl });
  return (
    <div>
      <div className='Title'>{themeName}</div>
      <div className='flex text-gray-1'>
        <div className='mr-6'>
          <div className='mb-2'>Primary color</div>
          <Form.Field
            name='primaryColor'
            onChange={() => {
              setValue('colorsMatchLogo', false);
              setValue('theme', 'Custom');
            }}
            placeholder=''
            component={Input.color}
          />
        </div>
        <div>
          <div className='mb-2'>Font</div>
          <Form.Field
            name='font'
            onChange={() => {
              setValue('colorsMatchLogo', false);
              setValue('theme', 'Custom');
            }}
            component={Input}
          />
        </div>
      </div>
      <div className='flex mt-3'>
        <Form.Field
          name='colorsMatchLogo'
          onChange={() => {
            if (extractedColor) {
              setValue('theme', 'Custom');
              setValue('primaryColor', extractedColor);
            }
          }}
          component={Input.checkbox}
        />
        <span className='text-gray-1 opacity-70  ml-3'>Customize the theme to match my logo</span>
      </div>
    </div>
  );
};

export const ThemeSelectField: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const themeName = watch('theme');
  return (
    <Form.Field
      name='theme'
      onChange={() => {
        const theme = ThemesSelectInput.options.find((theme) => theme.name == themeName);
        console.log({ theme, themeName });
        if (theme) {
          setValue('primaryColor', theme.primaryColor);
          setValue('font', theme.font);
        }
        setValue('colorsMatchLogo', false);
      }}
      component={ThemesSelectInput}
    />
  );
};

// const LogoUrlField = ({ id }: any) => {
//   return (
//     <Form.Field
//       name="logoMediaUrl"
//       bucketKey={id}
//       component={Input.logoUpload}
//     />
//   )
// }

interface ThemesProps {
  className?: string;
  ewebinarId?: string;
}

const Themes = styled(({ ewebinarId }: ThemesProps) => {
  const eWebinarSvc = useEWebinar();
  const id = ewebinarId!;
  const ewebinar = eWebinarSvc.get({ id });

  return (
    <ApolloForm
      className='p-6'
      validationSchema={validationSchema}
      defaultValues={ewebinar.data}
      onSubmit={(value: any) => {
        eWebinarSvc.update({ id, data: value });
      }}
    >
      <div className='flex justify-between border-b border-gray-5 pb-4'>
        <div className='flex items-center'>
          <img src={require('@src/images/themeHeadingIcon.svg').default} alt='Theme' className='pr-4' />
          <Text.subhead>Choose your eWebinar theme</Text.subhead>
        </div>
        <Form.SubmitButton containerId={'navbutton'} />
      </div>

      {/* themes radio buttons */}
      <div className='pt-4'>
        <ThemeSelectField />
      </div>
      <div className='flex justify-between pb-10'>
        <div className='w-1/2'>
          <ThemeOptions />
        </div>
      </div>

      <Form.ErrorMessage />
    </ApolloForm>
  );
})``;

export default Themes;
