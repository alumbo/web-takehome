import UserInterface from 'types/users';

interface AvatarProps {
  user: UserInterface;
  big?: boolean;
}
const Avatar = ({ user, big }: AvatarProps) => {
  const bulletSize = big ? 18 : 10;
  return (
    <div className="inline-block relative" style={{ width: big ? 90 : 50 }}>
      <img src={user.profilePicture} />
      {user.isActive ? (
        <div
          className={`absolute bg-[#00C514] bottom-0 right-0 border border-white rounded-full`}
          style={{ width: bulletSize, height: bulletSize }}
        ></div>
      ) : null}
    </div>
  );
};

export default Avatar;
