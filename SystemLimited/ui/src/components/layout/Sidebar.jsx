import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md transition ${
      isActive
        ? "bg-gray-800 text-teal-400 font-semibold"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-gray-900 p-6 text-white">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-2">
        <NavLink to="/dashboard" end className={linkClass}>
          Profile
        </NavLink>

        <NavLink to="/dashboard/users" className={linkClass}>
          Users
        </NavLink>

        <NavLink to="/dashboard/products" className={linkClass}>
          Products
        </NavLink>

        <NavLink to="/dashboard/orders" className={linkClass}>
          Orders
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
