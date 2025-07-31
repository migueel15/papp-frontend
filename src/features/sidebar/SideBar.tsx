import LogoHeader from "./components/LogoHeader";
import SideBarItem from "./components/SideBarItem";
import HomeIcon from "@/assets/icons/home.svg?react";
import TaskIcon from "@/assets/icons/task.svg?react";
import FinanceIcon from "@/assets/icons/finance.svg?react";
import SettingsIcon from "@/assets/icons/settings.svg?react";
import UserCard from "./components/UserCard";

const SideBar = () => {
  return (
    <div className="flex flex-col sidebar w-55 bg-bg-dark drop-shadow-lg p-3">
      <LogoHeader />
      <ul className="flex flex-col gap-1">
        <SideBarItem title="Dashboard" to="/" Icon={HomeIcon} />
        <SideBarItem title="Tasks" to="/tasks" Icon={TaskIcon} />
        <SideBarItem title="Finance" to="/finance" Icon={FinanceIcon} />
        <SideBarItem title="Settings" to="/settings" Icon={SettingsIcon} />
      </ul>
      <footer className="mt-auto">
        <UserCard />
      </footer>
    </div>
  );
};
export default SideBar;
