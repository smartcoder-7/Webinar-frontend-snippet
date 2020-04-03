import React from 'react';
import InteractionTemplate from './InteractionTemplate';
import { ReactionResult, Interaction, EWebinarSetFragment } from '@src/fromBackend/schema';
import { Router } from '@reach/router';
import RegistrantsModal from '../../InteractionResults/RegistrantsModal';
interface InteractionResultsProps {
  reactionResults: ReactionResult[];
  set: EWebinarSetFragment;
}
const InteractionResults: React.FC<InteractionResultsProps> = ({ reactionResults, set }) => {
  return (
    <>
      {reactionResults.map((reactionResult: any, interactionId: number) => (
        <InteractionTemplate
          interaction={reactionResult.interaction as Interaction}
          detailsFields={reactionResult.detailsFields}
          totalCount={reactionResult.totalCount}
          respondants={reactionResult.respondants}
          key={interactionId}
        />
      ))}
      <Router>
        <RegistrantsModal set={set} path=':interactionId' />
      </Router>
    </>
  );
};

export default InteractionResults;
