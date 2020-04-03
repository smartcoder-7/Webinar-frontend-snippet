import injectVariables from './index';
import { WelcomeMessageVariables, AttendeeFragment } from '@src/fromBackend/schema';

const injectWelcomeMessage = (welcomeMessage: string, attendee: AttendeeFragment) => {
  const attendeeFields = {
    firstName: attendee.firstName!,
    'first name': attendee.firstName!,
    lastName: attendee.lastName!,
    'last name': attendee.lastName!,
    name: attendee.firstName + ' ' + attendee.lastName,
  };
  const neededAttendeeFields: WelcomeMessageVariables = {
    ...attendeeFields,
    attendee: attendeeFields,
  };
  return injectVariables(welcomeMessage, neededAttendeeFields);
};

export default injectWelcomeMessage;
