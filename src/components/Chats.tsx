import moment from 'moment';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { LandingPageProps } from '../../pages';
import SearchIconSvg from 'icons/search-icon.svg';
import Avatar from './Avatar';

interface ChatsProps extends LandingPageProps {
  selectChatId: Dispatch<SetStateAction<string>>;
  selectedChatId: string;
}
const Chats = ({
  users,
  chats,
  messages,
  selectChatId,
  selectedChatId
}: ChatsProps) => {
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

  const [search, setSearch] = useState('');
  const [filteredChats, setFilteredChats] = useState(sortedChats);

  useEffect(() => {
    // select first chat by default
    selectChatId(sortedChats[0].id);
  }, []);

  // filter by search string
  useEffect(() => {
    setFilteredChats(
      sortedChats.filter(
        (chat) =>
          chat.user.name
            .toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1
      )
    );
  }, [search]);

  // clear filter search when select chat
  const searchInput = useRef<HTMLInputElement>();
  useEffect(() => {
    setSearch('');
  }, [selectedChatId]);

  return (
    <>
      <div className="relative mt-2 mb-2">
        <input
          className="bg-[#f3f3f3] w-full rounded-full border-0 p-[2px] pl-6 text-sm"
          type="text"
          placeholder="Search a person"
          onChange={(e) => setSearch(e.currentTarget.value)}
          ref={searchInput}
          value={search}
        />
        <SearchIconSvg className="absolute top-2 left-2 " />
      </div>
      <ul className="mt-4">
        {filteredChats.map((chat) => {
          const user = chat.user;
          const lastMessage = chat.fullMessage;
          return (
            <li
              className={`flex items-start p-[7px] rounded-2xl ${
                selectedChatId === chat.id ? 'bg-[#f3f3f3]' : 'cursor-pointer'
              }`}
              key={chat.id}
              onClick={() => selectChatId(chat.id)}
            >
              <Avatar user={user} />
              <div className="overflow-hidden pl-[10px] pr-[5px] w-full text-lg">
                {user.name}
                <span className="flex justify-between w-full text-[#848383] text-sm mt-[-2px]">
                  <div className="truncate">{lastMessage.content}</div>
                  <span className="whitespace-nowrap">
                    {moment(lastMessage.date).fromNow(true)}
                  </span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Chats;
