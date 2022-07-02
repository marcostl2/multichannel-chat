import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useChannelContext } from '../../hooks/useChannelContext';

import { ScreenWrapper } from '../../components/ScreenWrapper';

import './styles.css';

export function Login() {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(username);
    navigate('/channels');
  }

  const { login } = useChannelContext();

  return (
    <ScreenWrapper className="login-screen">
      <h1>Sign in</h1>
      <form className="form-login" onSubmit={handleSubmit}>
        <label htmlFor="user">Username</label>
        <input
          id="user"
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
    </ScreenWrapper>
  );
}
