import LogoHeader from "./components/LogoHeader";
import SideBarItem from "./components/SideBarItem";
import HomeIcon from "@/assets/icons/home.svg?react";
import FinanceIcon from "@/assets/icons/finance.svg?react";
import UserCard from "./components/UserCard";

const SideBar = () => {
  return (
    <div className="flex flex-col sidebar w-55 bg-bg-dark drop-shadow-lg p-3">
      <LogoHeader />
      <h1 className="text-text-muted mb-2">GENERAL</h1>
      <ul className="flex flex-col gap-2">
        <SideBarItem title="Dashboard" to="/" Icon={HomeIcon} />
        <SideBarItem title="Finance" to="/finance" Icon={FinanceIcon} />
        <SideBarItem title="Login" to="/auth/login" />
      </ul>
      <footer className="mt-auto">
        <UserCard />
      </footer>
    </div>
  );
};
export default SideBar;
