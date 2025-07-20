import SideBar from "@/features/sidebar/SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen h-screen">
      <SideBar />
      <div className="flex flex-1 bg-bg p-5">{children}</div>
    </div>
  );
};
export default Layout;
