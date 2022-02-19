import MessageInterface from 'types/messages';
import UserInterface from 'types/users';
import Avatar from './Avatar';
import ProfilePicture from 'images/profilePicture.png';
import moment from 'moment';
import { FormEvent, useEffect, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';

interface MessagesProps {
  user: UserInterface;
  messages: MessageInterface[];
}
const Messages = ({ user, messages }: MessagesProps) => {
  const headerHeight = 75;
  const messagesView = useRef<HTMLDivElement>();
  const input = useRef<HTMLInputElement>();
  const [messagesLive, setMessages] = useState<MessageInterface[]>(messages);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newMessage = input.current.value;
    input.current.value = '';
    setMessages([
      ...messagesLive,
      {
        id: `message-${messages.length.toString()}`,
        chatId: messages[0].chatId,
        writtenByMe: true,
        content: newMessage,
        date: moment().toString()
      }
    ]);
  };

  useEffect(() => {
    setMessages(messages);
  }, [messages]);

  useEffect(() => {
    input.current.focus();
  }, [input.current]);

  const scrollToBottom = () => {
    if (messagesView.current) messagesView.current.scrollTop = 1000000;
  };
  useEffect(() => {
    scrollToBottom();
  }, [messagesView.current, messagesLive]);
  return (
    <article className="flex-1 border-r border-l border-silver justify-between flex flex-col ">
      <header
        className={`flex items-center border-b-2 p-3 h-[${headerHeight}px]`}
      >
        <Avatar user={user} />
        <span className="pl-3 text-xl">{user.name}</span>
      </header>
      <div
        id="messages"
        className="overflow-auto"
        style={{
          height: `calc(100vh-${headerHeight}px)`
        }}
        ref={messagesView}
      >
        <ul>
          {messagesLive.map((message) => {
            return (
              <li
                key={message.id}
                className={`flex w-full items-center mb-3 pl-3 pr-3 ${
                  message.writtenByMe ? 'flex-row-reverse content-end' : ''
                }`}
              >
                <img
                  className="m-1"
                  width={26}
                  src={
                    message.writtenByMe ? ProfilePicture : user.profilePicture
                  }
                  data-tip={message.writtenByMe ? 'Me' : user.name}
                />
                <span
                  className="text-sm whitespace-pre"
                  data-tip={moment(message.date).format('LLL')}
                >
                  {message.content}
                </span>
                <ReactTooltip />
              </li>
            );
          })}
        </ul>
        <form className="pl-3 pr-3 mb-2" onSubmit={(e) => onSubmit(e)}>
          <input
            className="bg-[#f3f3f3] w-full rounded-full border-0 p-[2px] pl-3 text-sm "
            type="text"
            placeholder="Aa"
            ref={input}
          />
        </form>
      </div>
    </article>
  );
};

export default Messages;
