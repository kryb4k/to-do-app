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
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-cyan-700 font-semibold">
            <HiMiniCalendarDays />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/summary"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-cyan-700 font-semibold">
            <HiChartPie />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/task-list"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-cyan-700 font-semibold">
            <HiListBullet />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/add-form"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-cyan-700 font-semibold">
            <HiMiniPlusCircle />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-cyan-700 font-semibold">
            <HiArrowDownCircle />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
