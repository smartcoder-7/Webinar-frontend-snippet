import React, { FunctionComponent } from 'react';
import { Text, Form } from '@src/components/ui';
import { Input } from '@src/components/ui/Input';
import ApolloForm from '@src/components/ApolloForm';
import {
  UserOrderByFields,
  OrderDirection,
  UserAndPresenterInput,
  useAddUserMutation,
  useUpdateUserMutation,
  UserRole,
  PresenterOrderByFields,
} from '@src/fromBackend/schema';
import { TeamFormModes, dropdownOption } from '@src/sections/Profile/TeamEditForm';
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

const MemberEditForm: FunctionComponent<FormProps> = ({
  mode,
  defaultValues,
  validationSchema,
  dropdownRole,
  messageSuccess
}) => {
  const [addUserToTeam, addUserToTeamResult] = useAddUserMutation();
  const [updateUserInTeam, updateUserInTeamResult] = useUpdateUserMutation();

  const handleSubmit = async (data: UserAndPresenterInput) => {
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
      <div className='mb-4'>
        <Text>
          First name<span className='text-blue-3'>*</span>
        </Text>
        <Form.Field name='firstName' component={Input} placeholder='First name' />
      </div>
      <div className='mb-4'>
        <Text>
          Last name<span className='text-blue-3'>*</span>
        </Text>
        <Form.Field name='lastName' component={Input} placeholder='First name' />
      </div>
      <div className='mb-4'>
        <Text>
          Email <span className='text-blue-3'>*</span>
        </Text>
        <Form.Field name='email' component={Input} placeholder='Email' />
      </div>
      <div className='mb-4'>
        <Text>Select their role</Text>
        <Form.Field
          component={Input.dropdown}
          options={dropdownRole}
          name='role'
          defaultValue={
            defaultValues && defaultValues.role ? defaultValues.role : UserRole.Moderator
          }
        />
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
export default MemberEditForm;
