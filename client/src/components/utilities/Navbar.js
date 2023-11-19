import {
  HiMiniCalendarDays,
  HiChartPie,
  HiListBullet,
  HiArrowDownCircle,
  HiMiniPlusCircle,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul className="flex justify-center border-b">
        <li className="mb-px mr-1">
          <Link
            to="/"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-slate-600 text-center">
            <HiMiniCalendarDays className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/summary"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold">
            <HiChartPie className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/task-list"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold">
            <HiListBullet className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/add-form"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold">
            <HiMiniPlusCircle className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold">
            <HiArrowDownCircle className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
