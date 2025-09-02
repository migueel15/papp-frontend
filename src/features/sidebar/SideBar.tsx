import LogoHeader from "./components/LogoHeader";
import SideBarItem from "./components/SideBarItem";
import HomeIcon from "@/assets/icons/home.svg?react";
import TaskIcon from "@/assets/icons/task.svg?react";
import FinanceIcon from "@/assets/icons/finance.svg?react";
import SettingsIcon from "@/assets/icons/settings.svg?react";
import UserCard from "./components/UserCard";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  return (
    <div className={`
      flex flex-col sidebar w-55 bg-bg-dark drop-shadow-lg p-3 h-full md:h-screen
      fixed md:relative z-40
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0
    `}>
      {/* Botón cerrar para móvil */}
      <div className="flex justify-end md:hidden mb-2">
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-bg text-text-muted"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <LogoHeader />
      <ul className="flex flex-col gap-1">
        <SideBarItem title="Dashboard" to="/" Icon={HomeIcon} onClick={onClose} />
        <SideBarItem title="Tasks" to="/tasks" Icon={TaskIcon} onClick={onClose} />
        <SideBarItem title="Finance" to="/finance" Icon={FinanceIcon} onClick={onClose} />
        <SideBarItem title="Settings" to="/settings" Icon={SettingsIcon} onClick={onClose} />
      </ul>
      <footer className="mt-auto">
        <UserCard />
      </footer>
    </div>
  );
};
export default SideBar;
