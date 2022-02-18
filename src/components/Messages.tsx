import MessageInterface from 'types/messages';
import UserInterface from 'types/users';
import Avatar from './Avatar';
import ProfilePicture from 'images/profilePicture.png';
import moment from 'moment';

interface MessagesProps {
  user: UserInterface;
  messages: MessageInterface[];
}
const Messages = ({ user, messages }: MessagesProps) => {
  return (
    <article className="flex-1 border-r border-l border-silver justify-between flex flex-col h-[100vh] overflow-auto">
      <header className="flex items-center border-b-2 p-4">
        <Avatar user={user} />
        <span className="pl-3 text-xl">{user.name}</span>
      </header>
      <div>
        <ul>
          {messages.map((message) => {
            return (
              <li
                className={`flex w-full items-center mb-3 ${
                  message.writtenByMe ? 'flex-row-reverse content-end' : ''
                }`}
                title={moment(message.date).format('LLL')}
              >
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
