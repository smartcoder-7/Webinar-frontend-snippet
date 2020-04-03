import React, { ReactNode } from 'react';
import ChatSocket, { ChatSocketOptions } from './ChatSocket';
import config from '@src/config';

interface SocketProps {
  uri: string;
  options?: ChatSocketOptions;
  onConnect?: (socket: ChatSocket) => void;
  children: ReactNode;
}

export const SocketContext = React.createContext<ChatSocket>({} as ChatSocket);

class Socket extends React.Component<SocketProps> {
  socket: ChatSocket;
  options: ChatSocketOptions = {};

  constructor(props: SocketProps) {
    super(props);

    this.socket = new ChatSocket(
      `${config.CHAT_SERVER_URL}`,
      Object.assign(
        {
          onopen: (e) => {
            console.log('connected:', e);
            props.onConnect && props.onConnect(this.socket);
          },
          onmessage: (e) => console.log('message:', e),
          onreconnect: (e) => console.log('Reconnecting...', e),
          onmaximum: (e) => console.log('Stop Attempting!', e),
          onclose: (e) => console.log('Closed!', e),
          onerror: (e) => console.log('Error:', e),
        } as ChatSocketOptions,
        props.options
      )
    );
  }

  render(): ReactNode {
    return (
      <SocketContext.Provider value={this.socket}>
        {React.Children.only(this.props.children)}
      </SocketContext.Provider>
    );
  }
}

export default Socket;
