import React, { FunctionComponent, useState } from 'react';
import { Text } from '@src/components/ui';
import * as yup from 'yup';
import Button from '@src/components/ui/Button/index';
import { ReactComponent as AddIcon } from '@src/images/add.svg';
import Modal from '@src/components/ui/Modal';
import PresenterEditForm from '@src/sections/Presenters/PresenterEditForm';
import UserPresenterEditForm from './UserPresenterEditForm';
import MemberEditForm from './MemberEditForm';
import { ReactComponent as Info } from '@src/images/info.svg';
import { ReactComponent as ArrowDownIcon } from '@src/images/arrowDown.svg';
import { Popup } from 'semantic-ui-react';
import { isEmailAlreadyExist } from '@src/utils/validators/isEmailAlreadyExist';
import {
  UserRole,
  UserOrderByFields,
  OrderDirection,
  useTeamUsersQuery,
  MemberFragment,
  useResendInvitationEmailMutation,
  UserAndPresenterInput,
  useUpdateUserMutation,
  useMeQuery,
  PresenterFragment
} from '@src/fromBackend/schema';
import Loading from '@src/components/Loading';
import TeamMember from '@src/components/TeamMember';
import { ErrorMessage, TextMessage } from '@src/components/ui/MessageText';
import RemoveMemberModal from './RemoveMemberModal';
import Presenters from '@src/sections/Presenters';

export type TeamFormModes = 'create' | 'edit';

export const AdminRoles = [UserRole.Ops, UserRole.Admin];

export interface dropdownOption {
  value: string;
  text: string;
}

export const dropdownRole = [
  { value: UserRole.Admin, text: UserRole.Admin },
  { value: UserRole.Creator, text: UserRole.Creator },
  { value: UserRole.Moderator, text: UserRole.Moderator },
];

const dataTab = [
  {
    name: 'User',
    dataObject: MemberEditForm,
    status: 'Active',
    key: 'user',
  },
  {
    name: 'Presenter',
    dataObject: PresenterEditForm,
    status: 'Active',
    key: 'presenter',
  },
  {
    name: 'User and Presenter',
    dataObject: UserPresenterEditForm,
    status: 'Active',
    key: 'user-presenter',
  },
];

const stylePopup = {
  borderRadius: '3px',
  padding: '1rem',
};

const validationSchema = (user: any) =>
  yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup
      .string()
      .email()
      .required()
      .test({
        name: 'emailExist',
        test: async function(value: string) {
          if (!value || (user && user.email === value)) {
            return true;
          }
          const message = `Email ${value} already registered.`;
          const exist = await isEmailAlreadyExist(value);
          return exist ? this.createError({ message: message, path: 'email' }) : true;
        },
      }),
    socialLinks: yup.object().shape({
      facebook: yup.string().nullable().url(),
      twitter: yup.string().nullable().url(),
      linkedin: yup.string().nullable().url()
    }),
    bio: yup.string().nullable().max(255, 'The maximum length of Bio field is 255 characters.'),
  });

export const UserAndPresenterValue: UserAndPresenterInput = {
  firstName: '',
  lastName: '',
  email: '',
  role: UserRole.Moderator,
  profileMediaUrl: '',
  company: '',
  title: '',
  bio: '',
  phone: '',
  socialLinks: {
    facebook: '',
    twitter: '',
    linkedin: ''
  },
  presenterId: '',
};

interface UserPresenterModalProps {
  defaultTab: string;
  mode: TeamFormModes;
  defaultValues?: UserAndPresenterInput;
  onClose: () => void;
}

export const UserPresenterFormModal: FunctionComponent<UserPresenterModalProps> = ({
  defaultTab,
  mode,
  defaultValues,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  let messageSuccess = 'Team member updated.';
  if (mode == 'create') {
    messageSuccess = 'Team member added.';
  }

  return (
    <Modal className={`container-team-modal ${activeTab}`}>
      <div className='border-b border-gray-200 mb-5'>
        <div className='flex justify-between mx-6 my-5'>
          <Text.subhead>
            {mode === 'edit' ? 'Edit team member' : 'Add a new team member'}
          </Text.subhead>
          <Button onClick={() => onClose()}>
            <Text.note className='text-gray-600'>Cancel</Text.note>
          </Button>
        </div>
        <div className='tab_add_user flex mx-6'>
          {dataTab.map((data) => (
            <div
              key={data.key}
              className={`team-member-tab pb-5 mr-5 cursor-pointer ${
                activeTab === data.key ? 'active' : ''
              }`}
              onClick={() => {
                setActiveTab(data.key);
              }}
            >
              {data.name}
            </div>
          ))}
        </div>
      </div>
      {dataTab.map((data) => (
        <div key={data.key} className={activeTab === data.key ? 'active' : 'hidden'}>
          <data.dataObject
            mode={mode}
            defaultValues={
              !defaultValues ||
              (!defaultValues.id && defaultValues.presenterId && data.key !== 'presenter')
                ? UserAndPresenterValue
                : defaultValues
            }
            validationSchema={validationSchema}
            dropdownRole={dropdownRole}
            messageSuccess={messageSuccess}
          />
        </div>
      ))}
    </Modal>
  );
};

const TeamEditForm: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [defaultValues, setDefaultValues] = useState<UserAndPresenterInput>(UserAndPresenterValue);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mode, setMode] = useState<TeamFormModes>('create');
  const [errors, setErrors] = React.useState<any>([]);
  const [message, setMessage] = React.useState<any>(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [member, setMember] = useState<MemberFragment>();

  const [updateUserInTeam] = useUpdateUserMutation();
  const [resendInvitationEmail, { loading }] = useResendInvitationEmailMutation();

  let meQuery = useMeQuery();

  const teamUsersQuery = useTeamUsersQuery({
    variables: {
      filters: { orderBy: UserOrderByFields.CreatedAt, orderDirection: OrderDirection.Asc },
    },
  });

  if (!meQuery.data || !meQuery.data.me) return <Loading query={meQuery} />;
  const me = meQuery.data.me;

  if (!teamUsersQuery.data || !teamUsersQuery.data.teamUsers) {
    return <Loading />;
  }
  const teamUsers = teamUsersQuery.data.teamUsers;

  const changedRoleSuccess = 'Save changed';
  const sentEmailSuccess = 'Invitation email sent.';

  const handleModal = (state: boolean) => {
    setModalIsOpen(state);
    setActiveTab('user');
  };

  const openEditMember = (member: MemberFragment) => {
    handleModal(true);
    const userPresenterInput: UserAndPresenterInput = {
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName ? member.lastName : '',
      email: member.email,
      role: member.role as UserRole,
      profileMediaUrl: member.profileMediaUrl,
      bio: member.presenter.bio ? member.presenter.bio : '',
      company: member.presenter.company ? member.presenter.company : '',
      title: member.presenter.title ? member.presenter.title : '',
      phone: member.presenter.phone ? member.presenter.phone : '',
      socialLinks: member.presenter.socialLinks,
      presenterId: member.presenter.id,
    };
    setDefaultValues(userPresenterInput);
    setMode('edit');
  };

  const handlePresenterModal = (state: boolean) => {
    setModalIsOpen(state);
    setActiveTab('presenter');
  };

  const openEditPresenter = (presenter: PresenterFragment) => {
    const userPresenterInput: UserAndPresenterInput = {
      firstName: presenter.name,
      lastName: presenter.name,
      email: presenter.email ? presenter.email : '',
      profileMediaUrl: presenter.profileMediaUrl,
      title: presenter.title ? presenter.title : '',
      bio: presenter.bio ? presenter.bio : '',
      company: presenter.company ? presenter.company : '',
      phone: presenter.phone ? presenter.phone : '',
      socialLinks: presenter.socialLinks,
      presenterId: presenter.id
    };
    if (presenter.user) {
      userPresenterInput.id = presenter.user.id;
    }
    handleModal(true);
    setDefaultValues(userPresenterInput);
    setMode('edit');
    setActiveTab('presenter');
  };

  const closeModal = () => {
    handleModal(false);
    setDefaultValues(UserAndPresenterValue);
    setMode('create');
    setActiveTab('user');
  };

  const handleResendEmail = async (userId: string, teamId: string) => {
    const result = await resendInvitationEmail({
      variables: { userId, teamId }
    });
    if (result && result.errors) {
      setErrors(result.errors);
    }
    if (result && result.data && result.data.resendInvitationEmail) {
      setMessage(sentEmailSuccess);
    }
  };

  const handleChangeRole = async (member: MemberFragment, role: UserRole) => {
    const result = await updateUserInTeam({
      variables: {
        data: {
          id: member.id,
          role: role,
          firstName: member.firstName,
          lastName: member.lastName ? member.lastName : '',
          email: member.email,
        },
      },
    });
    if (result && result.errors) {
      setErrors(result.errors);
    }
    if (result && result.data && result.data.updateUser ) {
      setMessage(changedRoleSuccess);
    }
  };

  const handleRemoveMember = async (member: MemberFragment) => {
    setMember(member);
    setShowRemoveModal(true);
  }

  const handleCloseRemoveModal = () => {
    setShowRemoveModal(false);
  }

  return (
    <React.Fragment>
      {modalIsOpen && (
        <UserPresenterFormModal
          mode={mode}
          defaultTab={activeTab}
          defaultValues={defaultValues}
          onClose={closeModal}
        />
      )}

      {showRemoveModal && member && (
        <RemoveMemberModal
          me={me}
          member={member}
          users={teamUsers}
          onClose={handleCloseRemoveModal}
        />
      )}

      <div className='flex py-4 mb-4 border-b border-gray-300 items-center justify-between'>
        <div className='flex items-center'>
          <Text.subhead className='mr-3 font-medium text-gray-800'>Manage users</Text.subhead>
          <Button
            className='flex items-center px-4 font-medium py-2 text-blue-3'
            onClick={() => handleModal(true)}
          >
            <AddIcon className='mr-2' />
            New user
          </Button>
        </div>
        <div className='pr-2'>
          {errors && <ErrorMessage errors={errors} />}
          {message && <TextMessage message={message} />}
        </div>
      </div>
      <div className='pb-5'>
        <div className='flex justify-between py-2'>
          <div className={`w-5/12 flex content-center items-center`}>
            <Text className='text-gray-1 text-sm mr-1 cursor-pointer'>Name</Text>
            <ArrowDownIcon className='ml-1 cursor-pointer' />
          </div>
          <div className='w-2/12 flex'>
            <Text className='text-gray-1 text-sm mr-1 pl-2'>Roll</Text>
            <Popup
              content={
                <div className='font-medium'>
                  <div className='text mb-2'>
                    Admin
                    <p>Able to manage all eWebinars and settings</p>
                  </div>
                  <div className='text mb-2'>
                    Creator
                    <p>Able to create and edit eWebinars</p>
                  </div>
                  <div className='text mb-2'>
                    Moderator
                    <p>Able to chat with eWebinar attendees</p>
                  </div>
                </div>
              }
              key='Roll'
              size='small'
              style={stylePopup}
              position='bottom center'
              header=''
              trigger={<Info className='ml-1 cursor-pointer' />}
            />
          </div>
          <div className='w-3/12 flex'>
            <Text className={`text-gray-1 text-sm pl-2`}>Status</Text>
          </div>
          <div className='w-2/12 flex' />
        </div>
        {teamUsers.map((member: MemberFragment, i) => (
          <TeamMember
            key={i}
            member={member}
            changeRoleUser={handleChangeRole}
            openEditMember={openEditMember}
            resendInvitationEmail={handleResendEmail}
            removeMember={handleRemoveMember}
            dropdownRole={dropdownRole}
            isLoading={loading}
          />
        ))}
      </div>

      <Presenters handleFormModal={handlePresenterModal} openEditModal={openEditPresenter} />
    </React.Fragment>
  );
};

export default TeamEditForm;