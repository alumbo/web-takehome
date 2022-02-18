import ProfilePicture from 'images/profilePicture.png';

interface NavHeaderProps {
  chatsCount: number;
}
const NavHeader = ({ chatsCount }: NavHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-[5px] mt-[10px]">
      <img width={35} src={ProfilePicture} />
      <span className="text-sm">{chatsCount} chats</span>
    </div>
  );
};

export default NavHeader;
