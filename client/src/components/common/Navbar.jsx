import React from "react";
import {
  HiMiniCalendarDays,
  HiChartPie,
  HiListBullet,
  HiMiniPlusCircle,
} from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import ICSFile from "./ICSFile.jsx";

const Navbar = () => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };
  return (
    <div>
      <ul className="flex justify-center border-b">
        <li className="mb-px mr-1">
          <Link
            to="/"
            className={`${
              isActive("/") ? "bg-cyan-700 text-white" : ""
            } inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-slate-600 text-center md:hover:bg-cyan-900 md:hover:text-white`}>
            <HiMiniCalendarDays className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="mr-1 hidden md:inline-block">
          <Link
            to="/summary"
            className={`${
              isActive("/summary") ? "bg-cyan-700 text-white" : ""
            } inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-slate-600 text-center md:hover:bg-cyan-900 md:hover:text-white`}>
            <HiChartPie className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="mr-1 inline-block md:hidden">
          <Link
            to="/summary-mobile"
            className={`${
              isActive("/summary") ? "bg-cyan-700 text-white" : ""
            } inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-slate-600 text-center md:hover:bg-cyan-900 md:hover:text-white`}>
            <HiChartPie className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="md:hidden inline-block mr-1">
          <Link
            to="/task-list"
            className={`${
              isActive("/task-list") ? "bg-cyan-700 text-white" : ""
            } inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-slate-600 text-center md:hover:bg-cyan-900 md:hover:text-white`}>
            <HiListBullet className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/add-form"
            className={`${
              isActive("/add-form") ? "bg-cyan-700 text-white" : ""
            } inline-block md:hidden border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-slate-600 text-center md:hover:bg-cyan-900 md:hover:text-white`}>
            <HiMiniPlusCircle className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="mr-1">
          <ICSFile />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
