import { useAuth } from "@/features/auth/auth.hook";

const UserCard = () => {
  const auth = useAuth();
  const isAuthenticated = auth.isAuthenticated;

  return (
    <div className="flex bg-bg-light p-2 h-12 rounded-lg items-center gap-2 drop-shadow-md">
      {isAuthenticated ? (
        <>
          <img
            src={auth.user?.picture}
            alt="icon"
            className="aspect-square w-7 h-7 rounded-full"
          />
          <div className="flex flex-col truncate">
            <p className="text-xs text-nowrap text-text truncate">
              {auth.user?.name}
            </p>
            <p className="text-[10px] text-nowrap text-text-muted truncate">
              {auth.user?.email}
            </p>
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
