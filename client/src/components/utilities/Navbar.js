import React from "react";
import {
  HiMiniCalendarDays,
  HiChartPie,
  HiListBullet,
  HiArrowDownCircle,
  HiMiniPlusCircle,
} from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };
  return (
    <div className="dark:bg-slate-800 pt-2">
      <ul className="flex justify-center border-b">
        <li className="mb-px mr-1">
          <Link
            to="/"
            className={`${
              isActive("/") ? "bg-cyan-700 text-slate-100" : ""
            } inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-center dark:border-slate-200`}>
            <HiMiniCalendarDays className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/summary"
            className={`${
              isActive("/summary") ? "bg-cyan-700 text-slate-100" : ""
            } inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-center dark:border-slate-200`}>
            <HiChartPie className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="md:hidden inline-block mr-1">
          <Link
            to="/task-list"
            className={`${
              isActive("/task-list") ? "bg-cyan-700 text-slate-100" : ""
            } inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-center dark:border-slate-200`}>
            <HiListBullet className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/add-form"
            className={`${
              isActive("/add-form") ? "bg-cyan-700 text-slate-100" : ""
            } inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-center dark:border-slate-200`}>
            <HiMiniPlusCircle className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/"
            className={`${
              isActive("/") ? "bg-cyan-700 text-slate-100" : ""
            } inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-center dark:border-slate-200`}>
            <HiArrowDownCircle className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
