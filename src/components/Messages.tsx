import MessageInterface from 'types/messages';
import UserInterface from 'types/users';
import Avatar from './Avatar';

interface MessagesProps {
  user: UserInterface;
  messages: MessageInterface[];
}
const Messages = ({ user, messages }: MessagesProps) => {
  return (
    <article className="flex-1 border-r border-l border-silver">
      <header className="flex items-center border-b-2 p-4">
        <Avatar user={user} />
        <span className="pl-3 text-xl">{user.name}</span>
      </header>
    </article>
  );
};

export default Messages;
