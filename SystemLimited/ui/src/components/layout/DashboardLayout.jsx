import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

import Breadcrumbs from "./Breadcrumbs";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        
        <Breadcrumbs />

        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
