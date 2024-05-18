import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-full flex flex-row justify-start">
      <Sidebar />
      <div className="flex-1 bg-text-light p-4 text-white">
          {children}
      </div>
    </div>
  );
};

export default Layout;
