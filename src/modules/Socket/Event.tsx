import React from 'react';
import { SocketContext } from './Socket';
import { warning } from './log-utils';
import ChatSocket, { WebSocketEventType } from '@src/modules/Socket/ChatSocket';

interface EventProps {
  event: WebSocketEventType;
  handler: (e: any) => any;
}

class Event extends React.Component<EventProps> {
  constructor(props: EventProps) {
    super(props);
  }

  componentDidMount = () => {
    const { event, handler } = this.props;
    const socket: ChatSocket = this.context;

    if (!socket) {
      warning('Socket IO connection has not been established.');
      return;
    }

    socket.on(event, handler);
  };

  componentDidUpdate = (prevProps: { event: any; handler: any }) => {
    const socket = this.context;
    socket.off(prevProps.event, prevProps.handler);

    const { event, handler } = this.props;
    socket.on(event, handler);
  };

  componentWillUnmount = () => {
    const { event, handler } = this.props;
    const socket = this.context;

    if (!socket) {
      warning('Socket IO connection has not been established.');
      return;
    }

    socket.off(event, handler);
  };

  render = () => false;
}

Event.contextType = SocketContext;

export default Event;
