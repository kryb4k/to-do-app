import { HiChevronDown, HiOutlineCheckCircle } from "react-icons/hi";

const TaskListItem = ({ title, isDone }) => {
  return (
    <div className="flex border-b border-cyan-700 m-3 items-center justify-items-center block">
      <button className="w-1/6 text-center">
        <HiOutlineCheckCircle className="w-6 h-6 text-gray-400" />
      </button>
      <div className="w-full ml-1">
        <h1 className="uppercase tracking-wide text-gray-700 text-sm text-left font-bold p-2">
          {title}
        </h1>
      </div>
      <div className="w-1/8">
        <HiChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
};

export default TaskListItem;
