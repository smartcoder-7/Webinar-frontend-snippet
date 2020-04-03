import React, { FunctionComponent, useEffect, useState } from 'react';
import InteractionResults from './InteractionResults';
import {
  ReactionResult,
  InteractionType,
  useReactionResultsQuery,
  EWebinarSetFragment,
} from '@src/fromBackend/schema';
import Loading from '@src/components/Loading';
import WebinarPlayer from '@src/components/WebinarPlayer';
import DashboardFilter from '@src/components/DashboardFilter';
import { getDateStringForDashboardFilter } from '@src/utils/date';
import InteractionFilterByTypes from './InteractionFilterByTypes';
import { defaultSelected } from '@src/modules/Interaction/constants';

interface FilterInteractionResultsProps {
  set: EWebinarSetFragment;
}

const FilterInteractionResults: FunctionComponent<FilterInteractionResultsProps> = ({ set }) => {
  const ewebinar = set.publicWebinar ? set.publicWebinar : set.draftWebinar;
  const { from, to } = React.useContext(DashboardFilter.Context);
  const interactionsResult = useReactionResultsQuery({
    variables: {
      ewebinarSetId: set.id,
      from: getDateStringForDashboardFilter(from),
      to: getDateStringForDashboardFilter(to),
    },
  });

  const [types, setTypes] = useState<string[]>([defaultSelected.value]);
  const [reactionResultsFilter, setReactionResultsFilter] = useState<ReactionResult[]>([]);

  useEffect(() => {
    if (!interactionsResult.data || !interactionsResult.data.reactionResults) return;
    const reactionsData = interactionsResult.data.reactionResults;
    let reactionResult = reactionsData
      .filter((result) =>
        typeFilterResult.includes(
          result.interaction && result.interaction.type ? result.interaction.type : ''
        )
      )
      .filter((result) => {
        return (
          types.includes(defaultSelected.value) ||
          types.includes(result.interaction.type.toLowerCase())
        );
      });

    setReactionResultsFilter(reactionResult as ReactionResult[]);
  }, [interactionsResult]);

  if (!interactionsResult.data || !interactionsResult.data.reactionResults) {
    return <Loading query={interactionsResult} />;
  }
  const reactions = interactionsResult.data.reactionResults;

  const typeFilterResult = [
    InteractionType.Poll as String,
    InteractionType.SpecialOffer as String,
    InteractionType.Handout as String,
    InteractionType.Question as String,
    InteractionType.Feedback as String,
  ];

  const onChangeFilter = (types: string[]) => {
    const reactionResult = reactions
      .filter((result) =>
        typeFilterResult.includes(
          result.interaction && result.interaction.type ? result.interaction.type : ''
        )
      )
      .filter((result) => {
        return (
          types.includes(defaultSelected.value) ||
          types.includes(result.interaction.type.toLowerCase())
        );
      });
    setTypes(types);
    setReactionResultsFilter(reactionResult as ReactionResult[]);
  };

  return (
    <>
      <div className='wide-container h-full mx-auto shadow-lg'>
        <WebinarPlayer mode={WebinarPlayer.Mode.edit} ewebinarId={ewebinar.id}>
          <WebinarPlayer.Left>
            <div className='relative'>
              <WebinarPlayer.Player />
            </div>
            <WebinarPlayer.Timeline />
          </WebinarPlayer.Left>
          <WebinarPlayer.Right>
            <div className={`bg-white h-full overflow-auto`}>
              <div className='px-5 py-3 flex justify-between items-center'>
                <p>{reactionResultsFilter.length} interactions active</p>
                <InteractionFilterByTypes
                  types={typeFilterResult}
                  onChangeFilter={(types: string[]) => onChangeFilter(types)}
                />
              </div>
              <InteractionResults
                set={set}
                reactionResults={(reactionResultsFilter as ReactionResult[]) || []}
              />
            </div>
          </WebinarPlayer.Right>
        </WebinarPlayer>
      </div>
    </>
  );
};

export default FilterInteractionResults;
