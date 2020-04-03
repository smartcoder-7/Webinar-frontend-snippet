import React from 'react';
import {
  EWebinarSetFragment,
  InteractionFragment,
  InteractionType,
  useGetEwebinarInteractionQuery,
} from '@src/fromBackend/schema';
import _ from 'lodash';
import { Modal } from '@src/components/ui';
import Registrants from '../Registrants';
import { Link } from '@reach/router';
import DownloadCsv from '../Registrants/DownloadCsvButton';
import formatSeconds from '@src/utils/formatSeconds';
import { ReactComponent as HandoutIcon } from '@src/images/handout.svg';
import { ReactComponent as PollIcon } from '@src/images/poll.svg';
import { ReactComponent as SpecialOfferIcon } from '@src/images/specialOffer.svg';
import { ReactComponent as QuestionIcon } from '@src/images/interactionQuestion.svg';
import { ReactComponent as TipIcon } from '@src/images/interactionTip.svg';
import { ReactComponent as ReactOutIcon } from '@src/images/interactionReachout.svg';
import { ReactComponent as FeedbackIcon } from '@src/images/interactionFeedback.svg';
import Loading from '@src/components/Loading';

interface Props {
  set: EWebinarSetFragment;
  interactionId?: string;
}

const getInteractionIcon = (interaction: InteractionFragment): React.FC<any> => {
  const { type } = interaction;
  switch (type) {
    case InteractionType.Handout:
      return HandoutIcon;
    case InteractionType.SpecialOffer:
      return SpecialOfferIcon;
    case InteractionType.Tip:
      return TipIcon;
    case InteractionType.Question:
      return QuestionIcon;
    case InteractionType.RequestToContact:
      return ReactOutIcon;
    case InteractionType.Feedback:
      return FeedbackIcon;
    case InteractionType.Poll:
      return PollIcon;
    default:
      return PollIcon;
  }
};

const getInteractionName = (interaction: InteractionFragment): string => {
  const { type } = interaction;
  switch (type) {
    case InteractionType.Handout:
      return 'Handout';
    case InteractionType.SpecialOffer:
      return 'Special offer';
    case InteractionType.Tip:
      return 'Tip';
    case InteractionType.Question:
      return 'Question';
    case InteractionType.RequestToContact:
      return 'Request to contact';
    case InteractionType.Feedback:
      return 'Feedback';
    case InteractionType.Poll:
      return 'Poll';
    default:
      return 'Poll';
  }
};

const getInteractionDetail = (
  interaction: InteractionFragment
): {
  title: string;
  Icon: React.FC<any>;
  type: string;
  name: string;
  appearAt: string;
} => {
  return {
    title: interaction.details ? interaction.details.title : '',
    Icon: getInteractionIcon(interaction),
    type: interaction.type,
    name: getInteractionName(interaction),
    appearAt: formatSeconds(interaction.appearAt),
  };
};

const RegistrantsModal = ({ set, interactionId }: Props) => {
  const query = useGetEwebinarInteractionQuery({
    variables: {
      id: interactionId!,
    },
  });
  if (!query.data || !query.data.interaction) return <Loading query={query} />;
  const { title, Icon, appearAt, name } = getInteractionDetail(query.data.interaction);

  return (
    <Registrants
      conpactHeader
      set={set}
      interaction={query.data.interaction}
      render={({ content, onDownloadCsv }) => {
        return (
          <Modal widthClass='container mx-auto'>
            <Modal.Title className='bg-gray-300 h-20 py-8 flex items-center pl-8'>
              <span className='flex items-center jusfity-center w-8 h-6 '>
                <Icon className='mr-2 fill-current text-green-2' />
              </span>{' '}
              {title}
            </Modal.Title>
            {content}
            <Modal.Footer className='flex'>
              <div className='flex flex-1 text-gray-500 text-base pt-1'>
                {name} appears at {appearAt}
              </div>
              <div className='flex justify-between'>
                <DownloadCsv onClick={onDownloadCsv} />
                <Link
                  to='../'
                  className='ml-8 appearence-none bg-gray-2 rounded-full font-bold text-sm text-white px-8 py-0 px-8 leading-loose'
                >
                  <span>OK</span>
                </Link>
              </div>
            </Modal.Footer>
          </Modal>
        );
      }}
    />
  );
};

export default RegistrantsModal;
