import React from "react";
import { Outlet } from "react-router-dom";
import CompanyToggle from "@/components/CompanyToggle/CompanyToggle";
import ConfigNav from "@/components/Nav/ConfigNav";
import Notification from "@/components/Notification/Notification";

const BaseLayout: React.FC = () => {

  return (
    <div className="flex h-screen items-center">
      <header className="self-start">
        <ConfigNav/>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Notification />
      <CompanyToggle />
    </div>
  );
};

export default BaseLayout;
