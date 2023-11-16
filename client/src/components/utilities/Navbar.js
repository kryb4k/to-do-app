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
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-cyan-700 font-semibold text-center">
            <HiMiniCalendarDays className="md:w-10 md:h-10" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/summary"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-cyan-700 font-semibold">
            <HiChartPie className="md:w-10 md:h-10" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/task-list"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-cyan-700 font-semibold">
            <HiListBullet className="md:w-10 md:h-10" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/add-form"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-cyan-700 font-semibold">
            <HiMiniPlusCircle className="md:w-10 md:h-10" />
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-cyan-700 font-semibold">
            <HiArrowDownCircle className="md:w-10 md:h-10" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
