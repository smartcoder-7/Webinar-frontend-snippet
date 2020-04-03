import React, { FunctionComponent } from 'react';
import { Modal, Button, Text, Input, Form } from '@src/components/ui';
import {
  MemberFragment,
  MeFragment,
  UserOrderByFields,
  OrderDirection,
  useRemoveUserMutation,
} from '@src/fromBackend/schema';
import ApolloForm from '@src/components/ApolloForm';
import { GET_USERS } from '@src/hooks/useTeam';
import { AdminRoles } from '@src/sections/Profile/TeamEditForm';

interface RemoveModalProps {
  me: MeFragment;
  member: MemberFragment;
  users: MemberFragment[];
  onClose: () => void;
}

interface RemoveUserInput {
  id: string;
  replacementId: string;
}

interface Option {
  text: string;
  value: string;
}

const SelectReplacementUser: FunctionComponent<RemoveModalProps> = ({
  me,
  member,
  users,
  onClose,
}) => {
  const [removeUserMutation] = useRemoveUserMutation();

  const defaultValues: RemoveUserInput = {
    id: member.id,
    replacementId: me.id,
  };

  const replacementUsers = users.reduce((filtered: Option[], user) => {
    if (user.id !== member.id) {
      let option = { value: user.id, text: [user.firstName, user.lastName].join(' ') };
      filtered.push(option);
    }
    return filtered;
  }, []);

  const handleSubmit = async (data: RemoveUserInput) => {
    const variables = {
      variables: { ...data },
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
      ],
    };
    const removeUserResult = await removeUserMutation(variables);
    if (removeUserResult && removeUserResult.data && removeUserResult.data.removeUser) {
      onClose();
    }
  };

  return (
    <div className='flex flex-wrap h-full'>
      <div className='w-full mb-4'>
        <Text.subhead className='text-xl leading-tight text-black'>
          {[member.firstName, member.lastName].join(' ')} will be removed as a part of this team.
        </Text.subhead>
      </div>
      <div className='w-full mb-4'>
        <Text className='text-gray-4 leading-normal font-thin text-base'>
          Please select a new team member that will take over moderator responsibilities for any
          existing eWebinars.
        </Text>
      </div>
      <ApolloForm className='w-full' onSubmit={handleSubmit} defaultValues={defaultValues}>
        <Form.Field name='id' component='input' type='hidden' />
        <div className='w-full mb-2'>
          <Text.subhead className='text-base text-black'>
            Select a replacement team member:
          </Text.subhead>
        </div>
        <div className='w-full'>
          <Form.Field component={Input.dropdown} options={replacementUsers} name='replacementId' />
        </div>
        <div className='w-full flex justify-end mt-5'>
          <Button
            className='px-8 tet-gray-3'
            onClick={() => {
              onClose();
            }}
          >
            Don't remove
          </Button>
          <Form.SubmitButton className='px-8 py-2 font-light'>Remove</Form.SubmitButton>
        </div>
        <Form.ErrorMessage />
      </ApolloForm>
    </div>
  );
};

const WarningYourSelf: FunctionComponent<{ onClose: () => void, confirmRemove: () => void }> = ({ onClose, confirmRemove }) => {
  return (
    <div className='flex flex-wrap justify-center'>
      <Modal.Close onClick={onClose} />
      <Text className='text-gray-4 leading-normal font-thin text-base'>
        Do you want to remove yourself out of the team?
      </Text>
      <div className='w-full flex justify-end mt-5'>
        <Button
          className='px-8 tet-gray-3'
          onClick={() => {
            onClose();
          }}
        >
          Don't remove
        </Button>
        <Button.blueRounded
          className='px-8'
          onClick={() => {
            confirmRemove();
          }}
        >
          OK
        </Button.blueRounded>
      </div>
    </div>
  );
};

const WarningLastAdmin: FunctionComponent<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className='flex flex-wrap justify-center'>
      <Modal.Close onClick={onClose} />
      <Text className='text-gray-4 leading-normal font-thin text-base'>
        You must maintain at least one Admin in a team at all times.
      </Text>
    </div>
  );
};

const RemoveMemberModal: FunctionComponent<RemoveModalProps> = ({
  me,
  member,
  users,
  onClose,
}) => {
  const [isRemoveYourself, setIsRemoveYourself] = React.useState(false);
  const admins = users.filter(u => AdminRoles.includes(u.role) && u.id !== member.id);
  const confirmRemoveYourself = () => {
    setIsRemoveYourself(true);
  }

  return (
    <Modal className='remove-member-modal'>
      <div className='p-10'>
        {me.id === member.id && !isRemoveYourself ? (
          <WarningYourSelf onClose={onClose} confirmRemove={confirmRemoveYourself} />
        ) : admins.length === 0 && AdminRoles.includes(member.role) ? (
          <WarningLastAdmin onClose={onClose} />
        ) : (
          <SelectReplacementUser me={me} member={member} users={users} onClose={onClose} />
        )}
      </div>
    </Modal>
  );
};

export default RemoveMemberModal;
