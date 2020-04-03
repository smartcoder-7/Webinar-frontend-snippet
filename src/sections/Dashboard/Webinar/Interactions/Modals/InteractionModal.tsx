import { navigate } from '@reach/router';
import ApolloForm from '@src/components/ApolloForm';
import { Form, Input, Modal } from '@src/components/ui';
import { WebinarPlayerContext } from '@src/components/WebinarPlayer';
import {
  InteractionFragment,
  InteractionType,
  RoomType,
  useCreateInteractionMutation,
  useDeleteInteractionMutation,
  useUpdateInteractionMutation,
} from '@src/fromBackend/schema';
import { GET_EWEBINAR_INTERACTIONS_VIEW_MODE } from '@src/hooks/useEwebinarInteractions';
import { getUrlParameter } from '@src/utils/getUrlParameter';
import React from 'react';

import { ActionButtons, AppearAtField, FieldLabel, ModalTitle } from '../Modals';
import HandoutModal from './HandoutModal';
import OfferModal from './OfferModal';
import PollModal from './PollModal';
import QuestionModal from './QuestionModal';
import TipModal from './TipModal';

interface InteractionModalProps {
  ewebinarId: string;
  interactionId?: string;
}

interface InteractionConfig {
  Component: React.FC<any>;
  haveImage: boolean;
  onBeforeSubmit?: (data: any) => any;
}

const hideModal = () => navigate('../interactions');

const getModalConfig = (type: InteractionType): InteractionConfig => {
  switch (type) {
    case InteractionType.Handout:
      return {
        Component: HandoutModal,
        haveImage: true,
      };
    case InteractionType.SpecialOffer:
      return {
        Component: OfferModal,
        haveImage: true,
      };
    case InteractionType.Poll:
      return {
        Component: PollModal,
        haveImage: true,
      };
    case InteractionType.Question:
      return {
        Component: QuestionModal,
        haveImage: true,
      };
    default:
      return {
        Component: TipModal,
        haveImage: true,
      };
  }
};

const InteractionModal: React.FC<InteractionModalProps> = ({ ewebinarId, interactionId }) => {
  const [createInteraction] = useCreateInteractionMutation({
    refetchQueries: [
      {
        query: GET_EWEBINAR_INTERACTIONS_VIEW_MODE,
        variables: { ewebinarId, attendeeId: '' },
      },
    ],
  });
  const [updateInteraction] = useUpdateInteractionMutation();
  const [deleteInteraction] = useDeleteInteractionMutation({
    variables: {
      id: interactionId!,
    },
    refetchQueries: [
      {
        query: GET_EWEBINAR_INTERACTIONS_VIEW_MODE,
        variables: { ewebinarId, attendeeId: '' },
      },
    ],
  });
  const { interactions: interactionsQuery, rooms } = React.useContext(WebinarPlayerContext);
  const interaction =
    interactionId &&
    interactionsQuery &&
    interactionsQuery.data! &&
    interactionsQuery.data!.interactions &&
    interactionsQuery.data!.interactions.find(
      (interaction: InteractionFragment) => interaction.id == interactionId
    );

  const room = interaction ? interaction.room : (getUrlParameter('room') as RoomType);
  const playbackPosition = interaction
    ? interaction.appearAt + rooms!.getRoom(interaction!.room)!.appearAt
    : parseInt(getUrlParameter('playbackPosition'));
  const appearAt = playbackPosition;

  const type = interaction ? interaction.type : (getUrlParameter('type') as InteractionType);
  const defaultValues = Object.assign({}, interaction || {}, {
    appearAt,
    room,
    type,
  });

  // modify the time format in the right container

  const isEdit = !!interaction;
  const footer =
    type === InteractionType.Poll ? (
      <>
        <div className='flex'>
          <AppearAtField />
          <div className='ml-6 flex-grow'>
            <label>
              <FieldLabel title='Results to appear at...' />
              <Form.Field
                name='details.resultsAppearAt'
                component={Input}
                placeholder={'00:30:00'}
              />
            </label>
          </div>
        </div>
        <div className='pt-4'>
          <ActionButtons isEdit={isEdit} />
        </div>
      </>
    ) : (
      <div className='flex flex-row'>
        <AppearAtField />
        <ActionButtons
          onDelete={async () => {
            await deleteInteraction();
            hideModal();
          }}
          isEdit={isEdit}
        />
      </div>
    );
  const { Component, haveImage } = getModalConfig(type);

  if (!type) return null;
  return (
    <Modal>
      <React.Fragment>
        <Modal.Close color='white' onClick={() => hideModal()} />
        <ModalTitle type={type} />
        <ApolloForm
          onSubmit={async (data) => {
            const appearAt = data.appearAt - rooms?.getRoomAt(playbackPosition)!.appearAt;
            console.log({
              appearAt,
              data: data.appearAt,
              roomAt: rooms?.getRoomAt(playbackPosition)!.appearAt,
            });

            if (interaction) {
              await updateInteraction({
                variables: {
                  data: {
                    ...data,
                    id: interactionId,
                    type: interaction.type,
                    room: interaction.room,
                    appearAt,
                  },
                },
              });
            } else {
              await createInteraction({
                variables: {
                  data: {
                    ...data,
                    ewebinarId,
                    appearAt,
                  },
                },
              });
            }
            hideModal();
          }}
          defaultValues={defaultValues}
        >
          <Form.Field name='room' component='input' type='hidden' />
          <Form.Field name='type' component='input' type='hidden' />
          <Modal.Body className='px-0 py-0 overflow-y-scroll overflow-x-auto'>
            {haveImage && (
              <Form.Field
                name='details.imageUrl'
                className='w-full'
                component={Input.imageUpload2}
              />
            )}
            <div className='p-8'>
              <Component />
            </div>
          </Modal.Body>
          <Modal.Footer>{footer}</Modal.Footer>
        </ApolloForm>
      </React.Fragment>
    </Modal>
  );
};

export default InteractionModal;
