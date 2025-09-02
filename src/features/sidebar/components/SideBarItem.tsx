import { Link } from "react-router";

const SideBarItem = ({
  title,
  Icon,
  size = 18,
  to,
  onClick,
}: {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  to: string;
  size?: number;
  onClick?: () => void;
}) => {
  // get current path
  const currentPath = window.location.pathname;
  const isActive = currentPath === to;

  return (
    <Link to={to} onClick={onClick}>
      <div
        className={`flex items-center gap-2  rounded-md px-3 py-2 hover:text-primary hover:bg-bg transition duration-150 ${isActive ? "text-primary bg-bg-light drop-shadow-md" : "text-text-muted"}`}
      >
        {Icon && <Icon width={size} height={size} />}
        <span className="text-sm">{title}</span>
      </div>
    </Link>
  );
};

export default SideBarItem;
