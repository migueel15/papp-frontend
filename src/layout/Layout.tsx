import SideBar from "@/features/sidebar/SideBar";
import HomeIcon from "@/assets/icons/home.svg?react";
import RightArrow from "@/assets/icons/angle-small-right.svg?react";
import { useNavigate } from "react-router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const url = window.location.pathname;
  const navigate = useNavigate();
  const sectionName = url.split("/").pop() || "Dashboard";
  const section = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);

  // get array of sections from the URL
  const sections = url.split("/").filter((s) => s !== "");
  console.log("Sections:", sections);

  const isHome =
    sections.length === 0 ||
    (sections.length === 1 && sections[0] === "dashboard");

  const Breadcrumbs = () => {
    if (isHome) return null;
    return (
      <div className="flex items-center text-text-muted text-sm">
        <HomeIcon
          className="w-3 h-3 text-text-muted hover:text-text cursor-pointer"
          onClick={() => navigate("/")}
        />
        <RightArrow className="w-3 h-3 mx-2" />
        {sections.map((section, index) => {
          const isLast = index === sections.length - 1;
          const sectionName =
            section.charAt(0).toUpperCase() + section.slice(1);
          return (
            <span key={index} className="flex items-center">
              <span
                className="hover:text-text cursor-pointer"
                onClick={() => {
                  let path = "/";
                  let counter = 0;
                  while (counter <= index) {
                    path = `${path}${sections[counter]}/`;
                    counter++;
                  }
                  path = path.substring(0, path.length - 1);
                  navigate(path);
                }}
              >
                {sectionName}
              </span>
              {!isLast && <RightArrow className="w-3 h-3 mx-2" />}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex w-screen h-screen">
      <SideBar />
      <div className="flex flex-col flex-1 bg-bg p-5">
        {!isHome && <header className="flex mb-5">{Breadcrumbs()}</header>}
        <div className="flex flex-1">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
