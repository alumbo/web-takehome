import UserInterface from 'types/users';

interface AvatarProps {
  user: UserInterface;
}
const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className="relative w-[50px]">
      <img src={user.profilePicture} />
      <div className="absolute w-[10px] h-[10px] bg-[#00C514] bottom-0 right-0 border border-white rounded-full"></div>
    </div>
  );
};

export default Avatar;
