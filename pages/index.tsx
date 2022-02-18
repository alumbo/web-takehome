import generateUsers from "data/users";
import generateChats from "data/chats";

import ClubLogoSvg from "icons/club-logo.svg";
import UserInterface from "types/users";
import ChatInterface from "types/chats";
import MessageInterface from "types/messages";
import NavHeader from "components/NavHeader";

interface LandingPageProps {
  users: UserInterface[];
  chats: ChatInterface[];
  messages: MessageInterface[];
}

const LandingPage = ({ users, chats, messages }: LandingPageProps) => {
  console.log({ users, chats, messages });
  return (
    <>
      <section className="flex w-full h-[100vh]">
        <nav className="w-[268px] p-[10px]">
          <ClubLogoSvg className="w-[114px] m-auto mt-[10px] mb-[10px]" />
          <NavHeader chatsCount={chats.length} />
        </nav>
        <article className="flex-1">
          <p className="text-[23px] mt-[8px]">main chat</p>
        </article>
        <aside className="w-[268px]">search</aside>
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
    messages,
  }: { chats: ChatInterface[]; messages: MessageInterface[] } = generateChats();

  return {
    props: {
      users,
      chats,
      messages,
    },
  };
};

export default LandingPage;
