import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useChannelContext } from '../../hooks/useChannelContext';

import { ScreenWrapper } from '../../components/ScreenWrapper';

import './styles.css';

export const Chat = () => {
  const [message, setMessage] = useState('');

  const chatRef = useRef<HTMLDivElement>(null);

  const {
    channel,
    joinChannel,
    userIsTyping,
    createMessage,
    userName,
    handleUserIsTyping,
  } = useChannelContext();
  const { channelId } = useParams<{ channelId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!channelId) {
      navigate('/channels');
      return;
    }

    if (!userName) {
      navigate('/login');
      return;
    }

    joinChannel(channelId);
  }, []);

  useEffect(() => {
    goToBottom();
  }, [channel?.messages]);

  useEffect(() => {
    if (message.length) {
      handleUserIsTyping(userName);
    }

    const timeout = setTimeout(() => {
      handleUserIsTyping('');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [message]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createMessage(message);
    setMessage('');
  }

  function goToBottom() {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current?.scrollHeight);
    }
  }

  function handleTyping(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  return (
    <ScreenWrapper className="chat-screen">
      <div className="chat-screen-header">
        <div className="chat-screen-header-info">
          <h5># {channel?.name}</h5>
          <p>@{userName}</p>
        </div>
        <Link to="/channels">Go back</Link>
      </div>

      <div ref={chatRef} style={{ maxHeight: 300, overflowY: 'auto' }}>
        {channel?.messages.map((message, i) => (
          <div key={i}>
            <strong>{message.userName}</strong>: {message.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Write your message"
          type="text"
          value={message}
          onChange={handleTyping}
        />
        <button type="submit">Send</button>
      </form>
      {userIsTyping && userIsTyping !== userName && (
        <span>{userIsTyping} is typing...</span>
      )}
    </ScreenWrapper>
  );
};
