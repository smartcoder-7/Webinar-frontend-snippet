import React, { FunctionComponent } from 'react';
import { Text, Form } from '@src/components/ui';
import { Input } from '@src/components/ui/Input';
import ApolloForm from '@src/components/ApolloForm';
import Textarea from '@src/components/ui/Input/Textarea';
import { TeamFormModes, dropdownOption } from '@src/sections/Profile/TeamEditForm';
import { UserAndPresenterInput, UserRole, UserOrderByFields, OrderDirection, useAddUserMutation, useUpdateUserMutation, PresenterOrderByFields } from '@src/fromBackend/schema';
import { GET_USERS } from '@src/hooks/useTeam';
import { TextMessage } from '@src/components/ui/MessageText';
import { GET_ALL_PRESENTERS } from '@src/hooks/usePresenters';

interface FormProps {
  mode: TeamFormModes;
  defaultValues: UserAndPresenterInput;
  validationSchema: any;
  dropdownRole: dropdownOption[];
  messageSuccess: string;
}

const UserPresenterEditForm: FunctionComponent<FormProps> = ({
  mode,
  defaultValues,
  validationSchema,
  dropdownRole,
  messageSuccess
}) => {
  const [addUserToTeam, addUserToTeamResult] = useAddUserMutation();
  const [updateUserInTeam, updateUserInTeamResult] = useUpdateUserMutation();

  const handleSubmit = async (values: UserAndPresenterInput) => {
    const data = Object.assign({}, values);

    const variables = {
      variables: { data },
      refetchQueries: [
        {
          query: GET_USERS,
          variables: {
            filters: {
              orderBy: UserOrderByFields.CreatedAt,
              orderDirection: OrderDirection.Asc,
            },
          },
        },
        {
          query: GET_ALL_PRESENTERS,
          variables: {
            filters: {
              orderBy: PresenterOrderByFields.CreatedAt,
              orderDirection: OrderDirection.Asc,
            },
          },
        }
      ],
    };

    if (mode === 'create') {
      await addUserToTeam(variables);
    }
    if (mode === 'edit') {
      await updateUserInTeam(variables);
    }
  };

  return (
    <ApolloForm
      className='mx-6 pb-6'
      onSubmit={handleSubmit}
      validationSchema={validationSchema(defaultValues)}
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
        <div className='mb-4 w-full px-3'>
          <Text className='label-pretenser'>Select their roll</Text>
          <Form.Field
            component={Input.dropdown}
            options={dropdownRole}
            name='role'
            defaultValue={
              defaultValues && defaultValues.role ? defaultValues.role : UserRole.Moderator
            }
          />
        </div>
      </div>

      <div className='flex justify-end'>
        {mode === 'create' && <Form.SubmitButton className='px-8'>Send invite</Form.SubmitButton>}
        {mode === 'edit' && <Form.SubmitButton className='px-8'>Save</Form.SubmitButton>}
      </div>
      <Form.ErrorMessage />
      {addUserToTeamResult.data && addUserToTeamResult.data.addUser && <TextMessage message={messageSuccess} />}
      {updateUserInTeamResult.data && updateUserInTeamResult.data.updateUser && <TextMessage message={messageSuccess} />}
    </ApolloForm>
  );
};

export default UserPresenterEditForm;
