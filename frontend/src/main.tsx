import React from 'react';
import ReactDOM from 'react-dom';

import { ChannelContextProvider } from './context/ChannelContext';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ChannelContextProvider>
      <App />
    </ChannelContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
