import moment from 'moment';
import { useState } from 'react';
import { LandingPageProps } from '../../pages';
import SearchIconSvg from 'icons/search-icon.svg';

interface ChatsProps extends LandingPageProps {}
const Chats = ({ users, chats, messages }: ChatsProps) => {
  const getMessage = (id) => messages.find((m) => m.id === id);

  const fullfilledChats = chats.map((chat) => {
    return {
      ...chat,
      fullMessage: getMessage(chat.lastMessage),
      user: users.find((u) => u.id === chat.withUser)
    };
  });
  const sortedChats = fullfilledChats.sort((a, b) => {
    return moment(a.fullMessage.date) < moment(b.fullMessage.date) ? 1 : -1;
  });

  const [filteredChats, setFilteredChats] = useState(sortedChats);

  const filter = (search) => {
    if (search === '') setFilteredChats(sortedChats);
    setFilteredChats(
      sortedChats.filter(
        (chat) =>
          chat.user.name
            .toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1
      )
    );
  };

  return (
    <div>
      <div className="relative mt-2  mb-2">
        <input
          className="bg-[#f3f3f3] w-full rounded-full border-0 p-[2px] pl-6 text-sm"
          type="text"
          placeholder="Search a person"
          onKeyUp={(e) => filter(e.currentTarget.value)}
        />
        <SearchIconSvg className="absolute top-2 left-2 " />
      </div>
      <ul>
        {filteredChats.map((chat) => {
          const user = chat.user;
          const lastMessage = chat.fullMessage;
          return (
            <li className="flex" key={chat.id}>
              <img width={50} src={user.profilePicture} />
              {user.name}
              <br />
              {moment(lastMessage.date).fromNow()}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Chats;
