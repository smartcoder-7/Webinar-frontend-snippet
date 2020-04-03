import React, { FunctionComponent } from 'react';
import { Modal, Button, Text } from '@src/components/ui';
import {
  PresenterOrderByFields,
  OrderDirection,
  useRemovePresenterMutation
} from '@src/fromBackend/schema';
import { GraphQLError } from 'graphql';
import { GET_ALL_PRESENTERS } from '@src/hooks/usePresenters';
import { ErrorMessage } from '@src/components/ui/MessageText';

interface RemoveModalProps {
  id: string;
  closeModal: () => void;
}

const ConfirmRemovePresenter: FunctionComponent<RemoveModalProps> = ({
    id,
    closeModal,
  }) => {
    
    const [errors, setErrors] = React.useState<GraphQLError[]>([]);

  const [removePresenterMutation] = useRemovePresenterMutation();

  const handleRemove = async () => {
    const variables = {
      variables: { id },
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
    const removeResult = await removePresenterMutation(variables);
    if (removeResult && removeResult.errors) {
      setErrors(removeResult.errors.map((e) => e));
    }
    if (removeResult && removeResult.data && removeResult.data.removePresenter) {
      closeModal();
    }
  };

    return (
      <Modal className='remove-member-modal'>
        <div className='flex flex-wrap h-full p-10'>
            <div className='w-full mb-4'>
              <Text.subhead className='text-xl leading-tight text-black'>
                Remove Presenter Confirmation
              </Text.subhead>
            </div>
            <div className='w-full mb-4'>
              <Text className='text-gray-4 leading-normal font-thin text-base'>
                Do you want to remove this Presenter?
              </Text>
            </div>
            <div className='w-full flex justify-end mt-5'>
            <Button
              className='px-8 tet-gray-3'
              onClick={() => {
                closeModal();
              }}
            >
              Don't remove
            </Button>
            <Button.blueRounded onClick={() => handleRemove()} className='px-8 py-2 font-light'>Remove</Button.blueRounded>
          </div>
            {errors.length > 0 && <ErrorMessage errors={errors} />}
          </div>
      </Modal>
    );
  };

  export default ConfirmRemovePresenter;