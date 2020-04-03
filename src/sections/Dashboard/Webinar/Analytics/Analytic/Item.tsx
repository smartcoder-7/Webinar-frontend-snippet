import React, { Fragment } from 'react';
import _ from 'lodash';
import styled, { StyledComponent } from '@emotion/styled';
import tw from 'tailwind.macro';
import { Engagement, InteractionType } from '@src/fromBackend/schema';
import { Link } from '@reach/router';

// Render Rectangle
interface RectProp {
  color?: string;
}
export const Rectangle: StyledComponent<any, RectProp, any> = styled.div`
  ${tw`inline-block`}
  width: 10%;
  height: 5px;
  border-radius: 2px;
  ${
    (props) => props.color
    ? tw`bg-blue-3`
    : tw`bg-orange-2`
  }
`;
const Item: StyledComponent<any, any, any> = styled.div`
  ${tw`flex justify-between`}
  line-height: 16px;
  font-size: 13px;
  color: #0e282d;
  margin-bottom: 4px;
  min-width: 202px;
  .result {
    width: 60%;
    &-link {
      ${tw`underline text-blue-3`}
    }
  }
`;
// Render Registration Item
interface IRegistrationItem {
  data: {
    ratePercent: number;
    uniqueVisitors: number;
    registered: number;
  };
}
export const RegistrationItem = (props: IRegistrationItem) => {
  const { data } = props;
  const regisData = [
    {
      title: 'Unique Visitors',
      number: data && data.uniqueVisitors ? data.uniqueVisitors : 0,
    },
    {
      title: 'Registered',
      number: data && data.registered ? data.registered : 0,
    },
  ];
  const renderItem = (data: any[]) => {
    return data.map((item, index) => {
      return (
        <Item key={index}>
          <p>{item.title}</p>
          <span>{item.number}</span>
        </Item>
      );
    });
  };
  return <Fragment>{renderItem(regisData)}</Fragment>;
};
// Render Open Rate Item

interface IOpenRateItem {
  data: {
    ratePercent: number;
    notificationSent: number;
    notificationOpened: number;
  };
}
export const OpenRateItem = (props: IOpenRateItem) => {
  const { data } = props;
  const openData = [
    {
      title: 'Notifications Sent',
      number: data && data.notificationSent ? data.notificationSent : 0,
    },
    {
      title: 'Notifications Opened',
      number: data && data.notificationOpened ? data.notificationOpened : 0,
    },
  ];
  const renderItem = (data: any[]) => {
    return data.map((item, index) => {
      return (
        <Item key={index}>
          <p>{item.title}</p>
          <span>{item.number}</span>
        </Item>
      );
    });
  };
  return <Fragment>{renderItem(openData)}</Fragment>;
};

// Render Attended Item
interface IAttendedItem {
  data: any;
}
export const AttendedItem = (props: IAttendedItem) => {
  const { data } = props;
  const attendedData = [
    {
      title: 'Stayed to end',
      number: data && data.stayedToEnd ? data.stayedToEnd : 0,
      value: 'result',
    },
    {
      title: 'Left early',
      number: data && data.leftEarly ? data.leftEarly : 0,
    },
    {
      title: 'Average % watched',
      number:
        data && data.averagePercentWatched ? _.floor(data.averagePercentWatched, 2) + '%' : '0%',
    },
  ];
  const renderItem = (data: any[]) => {
    return data.map((item, index) => {
      return (
        <Item key={index}>
          <p>{item.title}</p>
          <span>{item.number}</span>
        </Item>
      );
    });
  };
  return <Fragment>{renderItem(attendedData)}</Fragment>;
};

// Render Engagement Item

interface IEngagementItem {
  data: Engagement;
}

export const EngagementItem = (props: IEngagementItem) => {
  const { data } = props;
  const engagementData = [
    {
      title: 'Chat messages',
      number: data && data.chatMessages ? data.chatMessages : 0,
    },
    {
      title: 'Questions answered',
      number: data && data.question ? data.question : 0,
      interactionType: InteractionType.Question
    },
    {
      title: 'Polls taken',
      number: data && data.poll ? data.poll : 0,
      result: 'Results',
      interactionType: InteractionType.Poll
    },
    {
      title: 'Offers clicked',
      number: data && data.specialOffer ? data.specialOffer : 0,
      interactionType: InteractionType.SpecialOffer
    },
    {
      title: 'HANDOUT downloads',
      number: data && data.handout ? data.handout : 0,
      interactionType: InteractionType.Handout
    },
    {
      title: 'Contact requests sent',
      number: data && data.requestToContact ? data.requestToContact : 0,
      interactionType: InteractionType.RequestToContact
    },
    {
      title: 'Ratings given',
      number: data && data.feedback ? data.feedback : 0,
      interactionType: InteractionType.Feedback,
    },
  ];
  const renderItem = (data: any[]) => {
    return data.map((item, index) => {
      return (
        <Item key={index}>
          <Link
            to={item.title === 'Chat messages' ? '../chat' : `../interactions?type=${item.interactionType}`}
            className='flex w-full justify-between'
          >
            <p>{item.title}</p>
            <span>{item.number}</span>
          </Link>
        </Item>
      );
    });
  };
  return <Fragment>{renderItem(engagementData)}</Fragment>;
};
