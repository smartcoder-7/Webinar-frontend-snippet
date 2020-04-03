import { navigate } from '@reach/router';
import ApolloForm from '@src/components/ApolloForm';
import React from 'react';
import * as yup from 'yup';

import RegistrationFormModalFields from './RegistrationFormModalFields';
import { PageBuilderModes } from '@src/sections/Dashboard/Webinar/Registration';
import {
  RegisterAttendeeInput,
  EWebinarFragment,
  RegistrationFormSettings,
  RegistrationFormSettingsInput,
  useRegisterAttendeeMutation,
  useUpdateEwebinarMutation,
} from '@src/fromBackend/schema';

// import { registrationFormFields } from "./types"

interface RegistrationFormProps {
  ewebinar: EWebinarFragment;
  onClose?: () => any;
  mode: PageBuilderModes;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ ewebinar, mode, onClose }) => {
  const [updateEWebinar] = useUpdateEwebinarMutation();
  const [registerAttendee] = useRegisterAttendeeMutation();
  // validation schema
  const validationSchema =
    mode === 'public'
      ? yup.object().shape({
          startTime: yup.string().required(),
          fields: yup
            .array()
            .of(
              yup
                .object()
                .shape({
                  isRequired: yup.boolean(),
                  value: yup.string().when('isRequired', {
                    is: true,
                    then: yup.string().required(),
                  }),
                })
                .required()
            )
            .required(),
          attendeeFields: yup.lazy((obj: any) => yup
            .object(
              Object.keys(obj).reduce((acc: any, key: any) => {
                if(key === '{2}') { // field email
                  acc[key] = yup
                    .object()
                    .shape({
                      value: yup
                        .string()
                        .email()
                        .required() 
                    }).required()
                }
                else if(obj[key].isRequired) {
                  acc[key] = yup
                    .object()
                    .shape({
                      value: yup
                        .string()
                        .required() 
                    }).required()
                }
                return acc;
              }, {})
            )
          )
        })
      : yup.object().shape({
          title: yup.string().required(),
          fields: yup
            .array().of(
              yup.object().shape({
                fieldName: yup.string().required(),
              })
            ),
          showConsentCheckbox: yup.boolean().required(),
          consentCheckboxText: yup
            .string()
            .when(
              'showConsentCheckbox',{
                is: true,
                then: yup
                  .string()
                  .required()
              }
            )
        });

  const onSubmit = async (
    formValues: Partial<RegistrationFormSettings> | Partial<RegisterAttendeeInput>
  ) => {
    if (mode === 'public') {
      const values = formValues as RegisterAttendeeInput;
      const { session, timeZone } = JSON.parse(values.startTime);
      const attendeeFields = values.attendeeFields;

      const firstName = attendeeFields["{0}"].value
        ? attendeeFields["{0}"].value as string
          : '';
      const lastName = attendeeFields["{1}"].value
        ? attendeeFields["{1}"].value as string
          : '';
      const email = attendeeFields["{2}"].value
        ? attendeeFields["{2}"].value as string
          : '';
      
      delete attendeeFields["{0}"];
      delete attendeeFields["{1}"];
      delete attendeeFields["{2}"];

      Object.keys(attendeeFields).forEach((key:any) => {
        delete attendeeFields[key].isRequired
      })

      const attendeeInput: RegisterAttendeeInput = {
        setId: ewebinar.set.id,
        attendeeFields: values.attendeeFields,
        firstName,
        lastName,
        email,
        startTime: session,
        timezone: timeZone
      };

      await registerAttendee({
        variables: { data: attendeeInput },
        update: (_cache, mutationResult) => {
          if (mutationResult.data && mutationResult.data.registerAttendee) {
            // TODO: Should really just encode attendee.attendeeId fields into URL so next component doesn't have to call for attendee again
            navigate(
              `/webinar/${ewebinar.set.id}/register/thankyou/${mutationResult.data.registerAttendee.id}`
            );
            return;
          }

          // TODO: Show error
        },
      });

      return;
    } else {
      formValues = formValues as RegistrationFormSettings
      // TODO: Verify this conversion works
      const formSettingsInput = {
        title: formValues.title,
        fields: formValues.fields,
        showConsentCheckbox: formValues.showConsentCheckbox,
        registerButton: formValues.registerButton || '',
        consentCheckboxText: formValues.consentCheckboxText || ''
      } as RegistrationFormSettingsInput;

      // editing form
      try {
        await updateEWebinar({
          variables: {
            data: {
              id: ewebinar.id,
              registrationFormSettings: formSettingsInput,
            },
          },
        });
      } catch (e) {
        console.log('submit error ', e);
        throw e;
      }
    }
  };

  return (
    <ApolloForm
      showUnsavedChangesDialog
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      defaultValues={ewebinar.registrationFormSettings}
    >
      <RegistrationFormModalFields
        onClose={onClose}
        ewebinar={ewebinar}
        registrationFormSettings={ewebinar.registrationFormSettings}
        mode={mode}
      />
    </ApolloForm>
  );
};

export default RegistrationForm;
