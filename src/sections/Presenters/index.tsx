import React, { FunctionComponent } from 'react';
import { Text } from '@src/components/ui';
import Button from '@src/components/ui/Button/index';
import { ReactComponent as AddIcon } from '@src/images/add.svg';
import { ReactComponent as ArrowDownIcon } from '@src/images/arrowDown.svg';
import {
  usePresentersQuery,
  PresenterOrderByFields,
  OrderDirection,
  PresenterFragment,
} from '@src/fromBackend/schema';
import Loading from '@src/components/Loading';
import Presenter from './Presenter';
import ConfirmRemovePresenter from './ConfirmRemovePresenter';

interface PresentersProps {
  handleFormModal: (state: boolean) => void;
  openEditModal: (presenter: PresenterFragment) => void;
}

const Presenters: FunctionComponent<PresentersProps> = ({ handleFormModal, openEditModal }) => {
  const [presenterId, setPresenterId] = React.useState<string>('');
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const presentersQuery = usePresentersQuery({
    variables: {
      filters: { orderBy: PresenterOrderByFields.CreatedAt, orderDirection: OrderDirection.Asc },
    },
  });

  if (!presentersQuery.data) {
    return <Loading />;
  }
  const presenters = presentersQuery.data.presenters;

  const openEditPresenter = (presenter: PresenterFragment) => {
    openEditModal(presenter);
  };

  const handleRemovePresenter = (id: string) => {
    setPresenterId(id);
    setOpenConfirmModal(true);
  };

  const handleCloseRemoveModal = () => {
    setOpenConfirmModal(false);
  };

  return (
    <React.Fragment>
      <div className='flex py-4 mb-4 border-b border-gray-300 items-center'>
        <Text.subhead className='mr-3 font-medium text-gray-800'>Manage presenters</Text.subhead>
        <Button
          className='flex items-center px-4 font-medium py-2 text-blue-3'
          onClick={() => handleFormModal(true)}
        >
          <AddIcon className='mr-2' />
          New presenter
        </Button>
      </div>

      <div className='pb-20'>
        <div className='flex justify-between py-2'>
          <div className={`w-5/12 flex content-center items-center`}>
            <Text className='text-gray-1 text-sm mr-1 cursor-pointer'>Name</Text>
            <ArrowDownIcon className='ml-1 cursor-pointer' />
          </div>
          <div className='w-5/12 flex pl-2'>
            <Text className='text-gray-1 text-sm mr-1'>Presenter Profile</Text>
          </div>
          <div className='w-2/12' />
        </div>
        {presenters.map((presenter: PresenterFragment, i) => (
          <React.Fragment key={i}>
            <Presenter
              presenter={presenter}
              openEditPresenter={openEditPresenter}
              removePresenter={handleRemovePresenter}
            />
          </React.Fragment>
        ))}
      </div>

      {openConfirmModal && presenterId && (
        <ConfirmRemovePresenter id={presenterId} closeModal={handleCloseRemoveModal} />
      )}
    </React.Fragment>
  );
};

export default Presenters;
