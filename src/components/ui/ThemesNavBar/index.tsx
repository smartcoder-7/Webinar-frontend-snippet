import React from 'react';
import { Form } from '@src/components/ui';
import { useFormContext } from 'react-hook-form';

import ThemeColorPicker from '@src/components/ui/ThemeColorPicker';

const ThemeSelectFeild = () => {
  const { setValue, watch } = useFormContext();
  const primaryColor = watch('primaryColor');

  return (
    <Form.Field
      name='theme'
      primaryColor={primaryColor}
      onColorChange={(colorHex: string) => {
        setValue('primaryColor', colorHex);
        // setValue("highlightColor", colorHex)
      }}
      onChange={(themeName: string) => {
        const theme = ThemeColorPicker.displayOptions.find((theme) => theme.value == themeName);
        console.log('themeName', themeName);
        if (theme) {
          setValue('primaryColor', theme.primaryColor);
          // setValue("highlightColor", theme.highlightColor)
        }
        // the following is used for the the logo color
        // if (extractedColor) {
        //     setValue("theme", "Custom")
        //     setValue("primaryColor", extractedColor)
        //   }
        setValue('colorsMatchLogo', false);
      }}
      placeholder={'Choose theme'}
      component={ThemeColorPicker}
    />
  );
};

//  the FontSelect will be added here as well
const ThemesNavBar = () => {
  return <ThemeSelectFeild />;
};

export default ThemesNavBar;
