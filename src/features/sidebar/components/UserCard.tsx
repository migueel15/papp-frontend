import { useAuth } from "@/features/auth/auth.hook";
import UserIcon from "@/assets/icons/user.svg?react";
import LogoutIcon from "@/assets/icons/logout.svg?react";

const UserCard = () => {
  const auth = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  const userImage = auth.user?.picture;
  console.log(userImage);

  return (
    <div className="flex bg-bg-light p-2 h-12 rounded-lg items-center gap-2 drop-shadow-md">
      {isAuthenticated ? (
        <>
          {userImage ? (
            <img
              src={auth.user?.picture}
              alt="icon"
              className="aspect-square w-7 h-7 rounded-full"
            />
          ) : (
            <div className="aspect-square w-7 h-7 rounded-full bg-bg-dark p-1">
              <UserIcon className="w-full h-full fill-current text-text-muted" />
            </div>
          )}
          <div className="flex flex-col truncate">
            <p className="text-xs text-nowrap text-text truncate">
              {auth.user?.name}
            </p>
            <p className="text-[10px] text-nowrap text-text-muted truncate">
              {auth.user?.email}
            </p>
          </div>
          <div
            onClick={() => {
              auth.logout();
            }}
            className="w-7 h-7 aspect-square rounded-full p-2 text-text hover:text-primary hover:cursor-pointer transition"
          >
            <LogoutIcon className="w-full h-full fill-current" />
          </div>
        </>
      ) : (
        <div className="flex flex-1 justify-center">
          <p className="text-xs text-text-muted">Please log in</p>
        </div>
      )}
    </div>
  );
};
export default UserCard;
