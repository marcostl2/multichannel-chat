import React, { createContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface IMessage {
  userName: string;
  message: string;
}

export interface ICHannel {
  name: string;
  id: string;
  messages: IMessage[];
}

interface IChannelContext {
  channels: ICHannel[];
  channel: ICHannel | undefined;
  userName: string;
  userIsTyping: string;

  createChannel(name: string): void;
  createMessage(message: string): void;
  login(userName: string): void;
  joinChannel(channelId: string): void;
  handleUserIsTyping(userName: string): void;
}

export const ChannelContext = createContext<IChannelContext>(
  {} as IChannelContext
);

const URL = 'http://localhost:3333';

export const ChannelContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userName, setUserName] = useState('');
  const [channels, setChannels] = useState<ICHannel[]>([]);
  const [channel, setChannel] = useState<ICHannel>();
  const [userIsTyping, setUserIsTyping] = useState<string>('');

  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io(URL);

    socket.current.on('channels:get', (data) => {
      setChannels(data);
    });

    socket.current.on('channel:get', (channel) => {
      setChannel(channel);
    });

    socket.current.on('channel:typing', (username: string) => {
      setUserIsTyping(username ?? '');
    });
  }, []);

  function login(userName: string) {
    socket.current?.emit('user:login', userName);
    setUserName(userName);
  }

  function createChannel(channelName: string) {
    socket.current?.emit('channel:create', channelName);
  }

  function joinChannel(channelId: string) {
    socket.current?.emit('channel:join', channelId);
  }

  function handleUserIsTyping(userName: string) {
    let userNameToSend = userName ?? '';

    socket.current?.emit('channel:typing', {
      channelId: channel?.id,
      userName: userNameToSend,
    });
  }

  function createMessage(message: string) {
    socket.current?.emit('message:create', {
      message,
      channelId: channel?.id,
      userName,
    });
  }

  return (
    <ChannelContext.Provider
      value={{
        login,
        channel,
        channels,
        createChannel,
        createMessage,
        joinChannel,
        userName,
        handleUserIsTyping,
        userIsTyping,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};
