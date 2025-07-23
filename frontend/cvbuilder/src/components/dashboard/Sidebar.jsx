import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#730217] text-white shadow-lg">
      <div className="p-4 border-b #C1C2D9">
        <h1 className="text-2xl font-bold">CV Builder Admin</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => 
                `flex items-center p-2 rounded-md ${isActive ? 'bg-blue-400' : 'bg-red-905'}`
              }
            >
              <span className="ml-3">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) => 
                `flex items-center p-2 rounded-md ${isActive ? 'bg-blue-400' : 'bg-red-905'}`
              }
            >
              <span className="ml-3">Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) => 
                `flex items-center p-2 rounded-md ${isActive ? 'bg-blue-400' : 'hover:bg-red-955'}`
              }
            >
              <span className="ml-3">Analytics</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;