import generateUsers from 'data/users';
import generateChats from 'data/chats';

import ClubLogoSvg from 'icons/club-logo.svg';
import UserInterface from 'types/users';
import ChatInterface from 'types/chats';
import MessageInterface from 'types/messages';
import NavHeader from 'components/NavHeader';
import Chats from 'components/Chats';

export interface LandingPageProps {
  users: UserInterface[];
  chats: ChatInterface[];
  messages: MessageInterface[];
}

const LandingPage = ({ users, chats, messages }: LandingPageProps) => {
  console.log({ users, chats, messages });
  return (
    <>
      <section className="flex w-full h-[100vh]">
        <nav className="w-[320px] p-[10px]  h-[100vh] overflow-auto">
          <ClubLogoSvg className="w-[114px] m-auto mt-[14px] mb-[14px]" />
          <NavHeader chatsCount={chats.length} />
          <Chats users={users} chats={chats} messages={messages} />
        </nav>
        <article className="flex-1 border-r border-l border-silver">
          <p className="text-[23px] mt-[8px]">main chat</p>
        </article>
        <aside className="w-[320px]">search</aside>
      </section>
    </>
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
