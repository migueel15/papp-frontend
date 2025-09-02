import SideBar from "@/features/sidebar/SideBar";
import HomeIcon from "@/assets/icons/home.svg?react";
import RightArrow from "@/assets/icons/angle-small-right.svg?react";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { useState } from "react";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    <div className="flex w-screen min-h-screen">
      {/* Botón hamburguesa - solo visible en móvil cuando sidebar está cerrado */}
      {!isSidebarOpen && (
        <button 
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-bg-dark rounded-md shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-transparent z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 bg-bg p-5 md:ml-0">
        {!isHome && <header className="flex mb-5 mt-12 md:mt-0">{Breadcrumbs()}</header>}
        {/* Margen superior para dashboard en móvil */}
        {isHome && <div className="mt-12 md:mt-0" />}
        {children && <div className="flex flex-1">{children}</div>}
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
