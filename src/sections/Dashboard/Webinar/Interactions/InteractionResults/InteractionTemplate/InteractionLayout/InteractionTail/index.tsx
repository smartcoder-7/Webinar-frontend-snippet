import React from 'react';
import { Link } from '@reach/router';
import { InteractionType, Interaction, ReactionResultDetails } from '@src/fromBackend/schema'

interface InteractionTailProps {
  interaction: Interaction;
  detailsFields: ReactionResultDetails;
  totalCount: number;
  respondants: number;
}

function secondToTime(second: number): string {
  var secNum = second // don't forget the second param
  var hours: number | string   = Math.floor(secNum / 3600);
  var minutes: number | string = Math.floor((secNum - (hours * 3600)) / 60);
  var seconds: number | string = secNum - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {
    hours   = "0" + hours;
  }
  
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  
  return ' ' + hours + ':' + minutes + ':' + seconds;
}

const InteractionTail: React.FC<InteractionTailProps>  = ({
  interaction,
  respondants
}) => {
  const { type } = interaction

  const renderTailResult = () => {
    switch (type) {
      case InteractionType.Poll:
      case InteractionType.SpecialOffer:
      case InteractionType.Handout:
      case InteractionType.Question:
      case InteractionType.Feedback:
        return (
          <>
            <p css={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
              At:    
              <span className="font-bold text-teal-4">
                {secondToTime(interaction.appearAt)}
              </span>
            </p>
            <Link to={`./${interaction.id}`}>
              <button
                className="bg-cyan-2 hover:bg-cyan-1 text-white px-3 rounded-full h-auto"
                css={{ fontSize: '12px', height: '22px', paddingTop: '0.05rem', paddingBottom: '0.05rem', whiteSpace: 'nowrap' }}
              >
                View respondants ({respondants})
              </button>
            </Link>
          </>
        );

      default:
        return null;
    }
  };

  return renderTailResult();
};

export default InteractionTail;
