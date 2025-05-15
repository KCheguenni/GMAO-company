import React from "react";
import { NavLink } from "react-router-dom";
import links from "./sidebarLinks";
import sagemcomlogo from "../../assets/img/sagemcomlogo.png";

export default function Sidebar() {
  return (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-col items-start justify-between md:w-64 z-10 py-4 px-6">

      {/* Logo */}
      <div className="w-full flex items-center justify-center py-2 mb-[-20px]">
        <NavLink to="/admin/dashboard" className="text-xl font-bold text-blue-600">
          <img src={sagemcomlogo} alt="Logo" className="w-1/2" />
        </NavLink>
      </div>

      {/* Main links container */}
      <div className="flex flex-col w-full flex-grow">
        {links.slice(0, 2).map((section, idx) => (
          <div key={idx} className="mt-4">
            {section.title && (
              <h6 className="text-gray-500 text-xs font-bold uppercase px-4 mb-2">
                {section.title}
              </h6>
            )}
            {section.items.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors " +
                  (isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100")
                }
              >
                <i className={`${item.icon} mr-3 text-base`}></i>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}


        <div
          className="mt-auto pt-6 border-t border-gray-200 absolute bottom-1 auto items-center"
          style={{ background: 'inherit' }}
        >
          {links[2].items.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:text-red-600 " +
                (isActive
                  ? "bg-red-500 text-white"
                  : "text-gray-700 hover:bg-gray-100")
              }
            >
              <i className={`${item.icon} mr-3 text-base`}></i>
              {item.label}
            </NavLink>
          ))}
        </div>

      </div>
    </nav>

  );
}

