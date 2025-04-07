import { Outlet } from "react-router-dom";

import Navbar from "../components/dashboard/Navbar";

const DashboardLayout = () => {
  return (
    <div className="bg-light-grey min-h-screen w-full flex flex-col p-5 space-y-5">
      <Navbar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
