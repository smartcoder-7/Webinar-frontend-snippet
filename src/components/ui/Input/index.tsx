import styled, { StyledComponent } from '@emotion/styled';
import Attendance from '@src/components/ui/Input/Attendance';
import CompanyIconUpload from '@src/components/ui/Input/CompanyIconUpload';
import Engagement from '@src/components/ui/Input/Engagement';
import EngageItem from '@src/components/ui/Input/EngagementItem';
import FrequencyCheck from '@src/components/ui/Input/FrequencyCheck';
import OneTimeOrRecurringButton from '@src/components/ui/Input/OneTimeOrRecurringButton';
import { withProperties } from '@src/utils/type';
import React from 'react';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import Radio from 'semantic-ui-react/dist/commonjs/addons/Radio';
import tw from 'tailwind.macro';

import Autocomplete from './Autocomplete';
import AvatarUpload from './AvatarUpload';
import BackgroundImageUpload from './BackgroundImageUpload';
import CalendarInput from './CalendarInput';
import Color from './Color';
import Country from './Country';
import DateRange from './DateRange';
import Font from './Font';
import HolidayBlackout from './HolidayBlackout';
import ImageUpload from './ImageUpload';
import ProfilePictureUpload from './ProfilePictureUpload';
import Province from './Province';
import SpecificTimes from './SpecificTimes';
import SpecificTimesBlackout from './SpecificTimesBlackout';
import SpecificTimesOperation from './SpecificTimesOperation';
import State from './State';
import Stripe from './Stripe';
import StripeCard from './StripeCard';
import Textarea from './Textarea';
import TimeElapsed from './TimeElapsed';
import TimeFrame from './TimeFrame';
import TitleInput from './TitleInput';
import Checkbox from './Checkbox';
// import Radio from './Radio'
// import TimeUnit from "./TimeUnit"
import Toggle from './Toggle';
import ToggleOnOff from './ToggleOnOff';
import Video from './Video';
import { WhenUnit } from '@src/fromBackend/schema';

export const Input: StyledComponent<any, any, any> & any = styled(
  ({ inputRef, children, ...props }) => {
    return <input ref={inputRef} {...props} />;
  }
)`
  ${tw`
  font-body
  appearance-none
  block
  antialiased
  text-base
  border
  border-gray-1
  rounded
  w-full
  px-3
  py-2
  font-light
  text-color-input
  leading-tight
  focus:outline-none
  focus:shadow`}
  &::placeholder {
    opacity: 1;
    ${tw`text-gray-1`}
  }
  &:disabled {
    opacity: 0.4;
  }
  font-size: 14px;
  max-height: 35px;
  padding: 0.55rem 0.75rem;
`;

/*
const Toggle: React.FC<any> = ({ ...props }) => {
  return (
    <Checkbox toggle {...props} />
  )
}

const ToggleOnOff: React.FC<any> = ({ ...props }) => {
  return <Toggle className='onoff' {...props} />
}
*/

const SelectDropdown: React.FC<{ onChange?: (v: any) => any } & React.ComponentProps<
  typeof Dropdown
>> = ({ value, ...props }) => {
  return (
    <Dropdown
      selection
      fluid
      {...props}
      onChange={(_, { value }) => props.onChange && props.onChange(value)}
      defaultValue={props.checked === undefined ? value : props.checked}
    />
  );
};

const TimeUnit: React.FC<any> = ({ ...props }) => {
  return (
    <SelectDropdown
      options={[
        { value: WhenUnit.Minutes, text: 'Minutes', key: 'm' },
        { value: WhenUnit.Hours, text: 'Hours', key: 'h' },
        { value: WhenUnit.Days, text: 'Days', key: 'd' },
      ]}
      {...props}
    />
  );
};

export default withProperties(Input, {
  toggle: Toggle,
  toggleOnOff: ToggleOnOff,
  stripe: Stripe,
  stripeCard: StripeCard,
  autocomplete: Autocomplete,
  video: Video,
  country: Country,
  province: Province,
  state: State,
  color: Color,
  font: Font,
  checkbox: Checkbox,
  titleInput: TitleInput,
  imageUpload: ImageUpload,
  imageUpload2: BackgroundImageUpload,
  profilePictureUpload: ProfilePictureUpload,
  companyIconUpload: CompanyIconUpload,
  textarea: Textarea,
  avatarUpload: AvatarUpload,
  timeunit: TimeUnit,
  timeElapsed: TimeElapsed,
  dropdown: SelectDropdown,
  calendarInput: CalendarInput,
  specificTimes: SpecificTimes,
  specificTimesBlackout: SpecificTimesBlackout,
  specificTimesOperation: SpecificTimesOperation,
  holidayBlackout: HolidayBlackout,
  timeframe: TimeFrame,
  daterange: DateRange,
  attendance: Attendance,
  engagement: Engagement,
  engageItem: EngageItem,
  oneTimeOrRecurringButton: OneTimeOrRecurringButton,
  frequencyCheck: FrequencyCheck,
  radio: Radio,
});
