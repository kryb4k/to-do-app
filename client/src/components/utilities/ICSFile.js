import { Link } from "react-router-dom";
import { HiArrowDownCircle } from "react-icons/hi2";
import { createEvents } from "ics";
import {
  getYear,
  getMonth,
  getDay,
  getHours,
  getMinutes,
  parseISO,
} from "date-fns";
import { useTodoContext } from "../../hooks/TodoContext.js";

const ICSFile = () => {
  const { state } = useTodoContext();

  const getCalendarEvent = (task) => {
    const startDate = parseISO(task.startDateTime);
    const endDate = parseISO(task.endDateTime);
    const start = [
      getYear(startDate),
      getMonth(startDate),
      getDay(startDate),
      getHours(startDate),
      getMinutes(startDate),
    ];

    const end = [
      getYear(endDate),
      getMonth(endDate),
      getDay(endDate),
      getHours(endDate),
      getMinutes(endDate),
    ];

    return {
      title: task.taskTitle,
      description: task.taskDescription,
      start,
      end,
    };
  };

  const getCalendarEvents = (tasks) => {
    return tasks.map((task) => getCalendarEvent(task));
  };

  const handleDownloadClick = async () => {
    const fileName = "tasks.ics";
    const file = await new Promise((resolve, reject) => {
      createEvents(getCalendarEvents(state.tasks), (error, value) => {
        if (error) {
          reject(error);
        }

        resolve(new File([value], fileName, { type: "text/calendar" }));
      });
    });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Link
        to="/"
        onClick={handleDownloadClick}
        className={`inline-block border-l border-t border-r rounded-t py-2 px-4 text-slate-600 font-semibold text-slate-600 text-center md:hover:bg-cyan-900 md:hover:text-white`}>
        <HiArrowDownCircle className="w-5 h-5 md:w-6 md:h-6" />
      </Link>
    </div>
  );
};

export default ICSFile;
