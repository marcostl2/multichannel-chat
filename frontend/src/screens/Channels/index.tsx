import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChannelContext } from '../../hooks/useChannelContext';

import { ScreenWrapper } from '../../components/ScreenWrapper';
import { ChannelList } from '../../components/ChannelList';

import './styles.css';

export const Channels = () => {
  const [channelName, setChannelName] = useState('');

  const { createChannel, userName } = useChannelContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createChannel(channelName);
    setChannelName('');
  }

  return (
    <ScreenWrapper className="channel-create-screen">
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Channel name</label>
        <br />
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      <ChannelList />
    </ScreenWrapper>
  );
};
