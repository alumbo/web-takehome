import generateUsers from 'data/users';
import generateChats from 'data/chats';

import ClubLogoSvg from 'icons/club-logo.svg';
import UserInterface from 'types/users';
import ChatInterface from 'types/chats';
import MessageInterface from 'types/messages';
import NavHeader from 'components/NavHeader';
import Chats from 'components/Chats';
import { useEffect, useState } from 'react';
import Messages from 'components/Messages';
import Avatar from 'components/Avatar';

export interface LandingPageProps {
  users: UserInterface[];
  chats: ChatInterface[];
  messages: MessageInterface[];
}

const LandingPage = ({ users, chats, messages }: LandingPageProps) => {
  const [selectedChatId, selectChatId] = useState<string>();
  const [selectedUser, selectUser] = useState<UserInterface>();
  const [selectedMessages, selectMessages] = useState<MessageInterface[]>();
  const [chatsLive, setChats] = useState<ChatInterface[]>(chats);
  const usersWithIsActive = users.map((u) => {
    return { ...u, isActive: chats.find((c) => c.withUser === u.id).isActive };
  });
  useEffect(() => {
    if (selectedChatId) {
      const chat = chatsLive.find((c) => c.id === selectedChatId);
      selectUser(usersWithIsActive.find((u) => u.id === chat.withUser));
      selectMessages(
        chat.messages.map((messageId) =>
          messages.find((m) => m.id === messageId)
        )
      );
      // set seen to true
      setChats(
        chatsLive.map((chat) => {
          if (chat.id === selectedChatId) return { ...chat, seen: true };
          return chat;
        })
      );
    }
  }, [selectedChatId]);

  return (
    <section className="flex w-full h-[100vh]">
      <nav className="w-[320px] p-[12px]  h-[100vh] overflow-auto">
        <ClubLogoSvg className="w-[114px] m-auto mt-[14px] mb-[14px]" />
        <NavHeader chatsCount={chats.length} />
        <Chats
          users={usersWithIsActive}
          chats={chatsLive}
          messages={messages}
          selectedChatId={selectedChatId}
          selectChatId={selectChatId}
        />
      </nav>
      {selectedUser ? (
        <Messages messages={selectedMessages} user={selectedUser} />
      ) : (
        '...'
      )}
      <aside className="w-[320px]  p-4">
        {selectedUser ? (
          <div className="text-center">
            <Avatar user={selectedUser} />
            <br />
            <span className="text-lg">{selectedUser.name}</span>
          </div>
        ) : null}
      </aside>
    </section>
  );
};

export const getServerSideProps = () => {
  // This is only an exemple of how you could pass data from server to client,
  // you may create another page and not use that use
  const users: UserInterface[] = generateUsers();
  const {
    chats,
    messages
  }: { chats: ChatInterface[]; messages: MessageInterface[] } = generateChats();

  return {
    props: {
      users,
      chats,
      messages
    }
  };
};

export default LandingPage;
