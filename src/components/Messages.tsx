import MessageInterface from 'types/messages';
import UserInterface from 'types/users';
import Avatar from './Avatar';
import ProfilePicture from 'images/profilePicture.png';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import ReactTooltip from 'react-tooltip';

interface MessagesProps {
  user: UserInterface;
  messages: MessageInterface[];
}
const Messages = ({ user, messages }: MessagesProps) => {
  const headerHeight = 75;
  const messagesView = useRef<HTMLDivElement>();
  useEffect(() => {
    messagesView.current.scrollTop = messagesView.current.scrollHeight;
  }, [messagesView.current, user.id]);
  return (
    <article className="flex-1 border-r border-l border-silver justify-between flex flex-col ">
      <header
        className={`flex items-center border-b-2 p-3 h-[${headerHeight}px]`}
      >
        <Avatar user={user} />
        <span className="pl-3 text-xl">{user.name}</span>
      </header>
      <div
        className="overflow-auto"
        style={{
          height: `calc(100vh-${headerHeight}px)`
        }}
        ref={messagesView}
      >
        <ul>
          {messages.map((message) => {
            return (
              <li
                data-tip={moment(message.date).format('LLL')}
                className={`flex w-full items-center mb-3 ${
                  message.writtenByMe ? 'flex-row-reverse content-end' : ''
                }`}
              >
                <ReactTooltip />
                <img
                  className="m-1"
                  width={26}
                  src={
                    message.writtenByMe ? ProfilePicture : user.profilePicture
                  }
                />
                <span className="text-sm whitespace-pre">
                  {message.content}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
};

export default Messages;
