import React from "react";
import SidebarDetail from "./SideBarDetail";

const Layout = ({ children }) => {
  return (
    <div className="h-full flex flex-row justify-start">
      <SidebarDetail className="h-screen" />
      <div className="flex-1 p-4 text-white">
        {children}
      </div>
    </div>
  );
};

export default Layout;
