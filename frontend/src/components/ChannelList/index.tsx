import { Link } from 'react-router-dom';
import { useChannelContext } from '../../hooks/useChannelContext';

import './styles.css';

export const ChannelList = () => {
  const { channels } = useChannelContext();

  return (
    <>
      {channels.length > 0 && (
        <div className="channel-list-wrapper">
          <h4>Channels</h4>
          <ul>
            {channels.map((channel) => (
              <li key={channel.id}>
                <Link to={`/chat/${channel.id}`}>{channel.name}</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path fill="#006aff" d="M16 12l-6 6V6z" />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
