import React, { FunctionComponent } from 'react';
import { Text, Form } from '@src/components/ui';
import * as yup from 'yup';
import { Input } from '@src/components/ui/Input';
import ApolloForm from '@src/components/ApolloForm';
import Textarea from '@src/components/ui/Input/Textarea';
import { TeamFormModes } from '@src/sections/Profile/TeamEditForm';
import {
  UserAndPresenterInput,
  PresenterOrderByFields,
  OrderDirection,
  useAddPresenterMutation,
  useUpdatePresenterMutation,
  EditPresenterInput,
} from '@src/fromBackend/schema';
import { GET_ALL_PRESENTERS } from '@src/hooks/usePresenters';
import { TextMessage } from '@src/components/ui/MessageText';

interface FormProps {
  mode: TeamFormModes;
  defaultValues?: UserAndPresenterInput;
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  socialLinks: yup.object().shape({
    facebook: yup
      .string()
      .nullable()
      .url(),
    twitter: yup
      .string()
      .nullable()
      .url(),
    linkedin: yup
      .string()
      .nullable()
      .url(),
  }),
  bio: yup
    .string()
    .nullable()
    .max(255, 'The maximum length of Bio field is 255 characters.'),
});

const PresenterEditForm: FunctionComponent<FormProps> = ({ mode, defaultValues }) => {
  const [addPresenter, addPresenterResult] = useAddPresenterMutation();
  const [updatePresenter, updatePresenterResult] = useUpdatePresenterMutation();

  let messageSuccess = 'Presenter has been added.';
  if (mode == 'edit') {
    messageSuccess = 'Presenter has been updated.';
  }

  const handleSubmit = async (values: UserAndPresenterInput) => {
    const data = Object.assign({}, values);
    const presenterId = data.presenterId;
    delete data.presenterId;
    const presenterInput: EditPresenterInput = { ...data };
    if (presenterId) {
      presenterInput.id = presenterId;
    }

    const variables = {
      variables: { data: presenterInput },
      refetchQueries: [
        {
          query: GET_ALL_PRESENTERS,
          variables: {
            filters: {
              orderBy: PresenterOrderByFields.CreatedAt,
              orderDirection: OrderDirection.Asc,
            },
          },
        },
      ],
    };
    if (mode === 'create') {
      await addPresenter(variables);
    }
    if (mode === 'edit') {
      await updatePresenter(variables);
    }
  };

  return (
    <ApolloForm
      className='mx-6 pb-6'
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      defaultValues={defaultValues}
    >
      <Form.Field name='id' component='input' type='hidden' />
      <Form.Field name='presenterId' component='input' type='hidden' />
      <div className='flex flex-wrap justify-between items-end'>
        <div className='mb-4 w-full px-3 presenter-upload-img'>
          <Form.Field name='profileMediaUrl' component={Input.profilePictureUpload} />
        </div>
        <div className='mb-4 w-6/12 px-3'>
          <Text className='label-pretenser'>
            First Name<span className='text-blue-3'>*</span>
          </Text>
          <Form.Field name='firstName' className='input-pretenser' component={Input} />
        </div>
        <div className='mb-4 w-6/12 px-3'>
          <Text className='label-pretenser'>
            Last Name<span className='text-blue-3'>*</span>
          </Text>
          <Form.Field name='lastName' className='input-pretenser' component={Input} />
        </div>
        <div className='mb-4 w-6/12 px-3'>
          <Text className='label-pretenser'>
            Email<span className='text-blue-3'>*</span>
          </Text>
          <Form.Field name='email' component={Input} />
        </div>
        <div className='mb-4 w-6/12 px-3'>
          <Text className='label-pretenser'>
            Phone <span>(optional)</span>
          </Text>
          <Form.Field name='phone' component={Input} />
        </div>
        <div className='mb-4 w-6/12 px-3'>
          <Text className='label-pretenser'>Company</Text>
          <Form.Field name='company' component={Input} />
        </div>
        <div className='mb-4 w-6/12 px-3'>
          <Text className='label-pretenser'>Title</Text>
          <Form.Field name='title' component={Input} />
        </div>

        <div className='mb-4 w-full px-3'>
          <Text className='label-pretenser'>Bio</Text>
          <Form.Field name='bio' component={Textarea} />
          <div className='pb-4 border-bottom-presenter' />
        </div>

        <div className='mb-4 w-6/12 px-3'>
          <Text className='label-pretenser'>
            Twitter link <span>(optional)</span>
          </Text>
          <Form.Field name='socialLinks.twitter' component={Input} />
        </div>
        <div className='mb-4 w-6/12 px-3'>
          <Text className='label-pretenser'>
            Facebook link <span>(optional)</span>
          </Text>
          <Form.Field name='socialLinks.facebook' component={Input} />
        </div>
        <div className='mb-4 w-6/12 px-3'>
          <Text className='label-pretenser'>
            LinKedIn link <span>(optional)</span>
          </Text>
          <Form.Field name='socialLinks.linkedin' component={Input} />
        </div>
        <div className='mb-4 w-full px-3'>
          <div className='pb-4 border-bottom-presenter' />
        </div>
      </div>

      <div className='flex justify-end'>
        {mode === 'create' && <Form.SubmitButton className='px-8'>Add</Form.SubmitButton>}
        {mode === 'edit' && <Form.SubmitButton className='px-8'>Save</Form.SubmitButton>}
      </div>
      <Form.ErrorMessage />
      {((addPresenterResult.data && addPresenterResult.data.addPresenter) ||
        (updatePresenterResult.data && updatePresenterResult.data.updatePresenter)) && (
        <TextMessage message={messageSuccess} />
      )}
    </ApolloForm>
  );
};

export default PresenterEditForm;
