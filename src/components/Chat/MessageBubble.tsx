import React from 'react';
import { Message } from '@src/fromBackend/schema';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { format } from 'date-fns';
import { WebinarPlayerContext } from '@src/components/WebinarPlayer';
import config from '@src/config';
import moment from 'moment';
import formatTimeInRoomSecs from '@src/utils/formatTimeInRoomSecs';
const BubbleWrap = styled.div`
  ${tw`flex flex-col whitespace-pre-wrap w-full `}
`;

const BubbleName = styled.div`
  ${tw`text-gray-1 text-sm inline-block mb-1 text-16/5`}
  a {
    ${tw`text-teal-4 underline`}
    cursor: pointer;
  }
  :empty {
    margin-top: 0;
  }
`;

const BubbleContent = styled.div`
  ${tw`inline-block rounded-lg p-3 text-sm text-gray-2 mb-4 text-16/5`}
`;

export const MessageBubble: React.FC<{
  message: Message;
  divRef?: React.Ref<HTMLDivElement> | null;
  setIsSeek?: (set: boolean) => void;
  isAttendee: boolean;
  fromName: string;
  isModeratorFirstMessage: boolean;
  previousMessage?: Message;
  isWelcomeMessage?: boolean;
}> = ({
  fromName,
  message,
  divRef,
  setIsSeek,
  isAttendee,
  isModeratorFirstMessage,
  previousMessage,
  isWelcomeMessage = false,
}) => {
  // webinar player context
  const webinarPlayer = React.useContext(WebinarPlayerContext);
  let isShowTimeToSeek = true;
  // should render message bubble
  const [shouldRender, setShouldRender] = React.useState(isWelcomeMessage ? false : true);

  // is this my message
  const isMyMessage = isAttendee ? message.fromAttendee : !message.fromAttendee;

  // time in room seconds
  const timeInRoomSecs = formatTimeInRoomSecs(message.timeInRoomSecs);
  if (
    !message.timeInRoomSecs ||
    (webinarPlayer.duration && message.timeInRoomSecs >= webinarPlayer.duration)
  ) {
    isShowTimeToSeek = false;
  }
  // time in video playback
  let timeSeek = message.timeInRoomSecs - config.TIME_TO_SEEK;
  timeSeek = timeSeek < config.TIME_TO_SEEK ? 0 : timeSeek;

  // time sent of message
  const timeSent = format(new Date(message.timeSent), 'hh:mm a, MMM do');
  const timeSentMinutes = new Date(message.timeSent).getTime() / (1000 * 60);

  const isDisableShow = isMyMessage ? false : true; // variable check to show header of list moderator message

  let isShowHeader = isAttendee ? '' : true;

  // first sent time from moderator messages (attendee view)
  if (previousMessage && !previousMessage.fromAttendee) {
    const timeBeforeMessageMinutes = new Date(previousMessage.timeSent).getTime() / (1000 * 60);
    if (!isMyMessage) {
      // compare time , if time sent of this message less time sent of before message than 15 mins => not show header . (attendee view)
      isDisableShow
        ? timeSentMinutes - timeBeforeMessageMinutes < 15
          ? (isShowHeader = false)
          : (isShowHeader = true)
        : (isShowHeader = true);
    }
  } else {
    isShowHeader = true;
  }

  // show welcome message
  React.useEffect(() => {
    // not a welcome message
    if (!isWelcomeMessage) return;

    let timer: any;
    const showMessageIn = moment(message.timeSent).diff(moment(), 'seconds');

    // timesent is in future, set timeout for future
    if (showMessageIn > 0) {
      timer = setTimeout(() => {
        setShouldRender(true);
      }, showMessageIn * 1000);
    } else {
      // timesent is in past, show message now
      setShouldRender(true);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [message.timeSent]);

  // don't render the message
  if (!shouldRender) return null;

  return (
    <BubbleWrap ref={divRef} className={`${isMyMessage ? 'items-end' : 'items-start'}`}>
      <BubbleName className={`${isAttendee && 'mx-auto'}`}>
        {isModeratorFirstMessage ? (
          <strong>
            {fromName} @ {timeSent}
          </strong>
        ) : isAttendee ? (
          !isMyMessage && isShowHeader ? (
            <strong>
              {fromName} @ {timeSent}
            </strong>
          ) : (
            ''
          )
        ) : /* my message and moderator view i.e. moderator message */
        isMyMessage ? (
          <strong>
            {fromName} @ {timeSent}
          </strong>
        ) : (
          <strong>{fromName} @ </strong>
        )}

        {/* {!isAttendee && isMyMessage ? : ''} */}
        {/* not my message and moderator view i.e. attendee message */}
        {!isMyMessage && !isAttendee ? (
          isShowTimeToSeek ? (
            <a
              onClick={(e) => {
                e.preventDefault();
                setIsSeek && setIsSeek(false);
                webinarPlayer.setPlaybackPosition && webinarPlayer.setPlaybackPosition(timeSeek);
              }}
            >
              {timeInRoomSecs}
            </a>
          ) : (
            timeSent
          )
        ) : (
          ''
        )}
      </BubbleName>
      <BubbleContent className={`${isMyMessage ? 'bg-gray-200' : 'border border-gray-200'}`}>
        {message.content}
      </BubbleContent>
    </BubbleWrap>
  );
};
