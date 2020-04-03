import React from 'react';
import { Interaction, ReactionResultDetails } from '@src/fromBackend/schema';

interface SpecialOfferProps {
  interaction?: Interaction;
  detailsFields?: ReactionResultDetails;
}

const SpecialOffer: React.FC<SpecialOfferProps> =({interaction}) => {

  return (
    <div className="block">
      <p className="text-black">
        {
          interaction
          && interaction.details
          && interaction.details.title
            ? interaction.details.title
            : ''
        }
      </p>
      <div className="mt-4 block">
        <label className="block text-gray-700 text-sm mb-1">
          {
            interaction
            && interaction.details
            && interaction.details.description
              ? interaction.details.description
              : ''
          }
        </label>
      </div>
    </div>
  )
};

export default SpecialOffer;
