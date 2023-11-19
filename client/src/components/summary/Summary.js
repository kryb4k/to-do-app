import { useState, useEffect } from "react";
import {
  endOfMonth,
  startOfMonth,
  startOfToday,
  startOfWeek,
  endOfWeek,
  format,
  startOfDay,
  endOfDay,
  addDays,
  addMonths,
  addWeeks,
  parseISO,
  subDays,
  subWeeks,
  subMonths,
} from "date-fns";
import { getAllTasksByMonth } from "../../api/getAllTasksByMonth.js";
import { toast } from "react-toastify";
import { useTodoContext } from "../../hooks/TodoContext.js";
import PieChartComponent from "./charts/PieChartComponent.js";
import BarChartComponent from "./charts/BarChartComponent.js";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import TaskList from "../taskList/TaskList";

const Summary = () => {
  const { dispatch } = useTodoContext();
  const today = startOfToday();
  const [startTimeRange, setStartTimeRange] = useState(
    format(startOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'")
  );
  const [endTimeRange, setEndTimeRange] = useState(
    format(endOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'")
  );
  const [chartTitle, setChartTitle] = useState("todays");

  const handleClickToday = () => {
    setStartTimeRange(format(startOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    setEndTimeRange(format(endOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    setChartTitle("todays");
  };
  const handleClickWeekly = () => {
    setStartTimeRange(
      format(startOfWeek(addDays(today, 1)), "yyyy-MM-dd'T'HH:mm:ss'Z'")
    );
    setEndTimeRange(format(endOfWeek(today), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    setChartTitle("weeks");
  };

  const handleClickMonthly = () => {
    setStartTimeRange(format(startOfMonth(today), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    setEndTimeRange(format(endOfMonth(today), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    setChartTitle("months");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllTasksByMonth(startTimeRange, endTimeRange);
        dispatch({ type: "SET_TASKS", payload: data });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Unable to fetch tasks. Please try again.");
      }
    }

    fetchData();
  }, [startTimeRange, endTimeRange, dispatch]);

  const next = (chartName, startDate, endDate) => {
    let newStartDate, newEndDate;

    switch (chartName) {
      case "todays":
        newStartDate = addDays(parseISO(startDate), 1);
        newEndDate = endOfDay(newStartDate);
        break;
      case "weeks":
        newStartDate = addWeeks(parseISO(startDate), 1);
        newEndDate = endOfWeek(newStartDate);
        break;
      case "months":
        newStartDate = addMonths(parseISO(startDate), 1);
        newEndDate = endOfMonth(newStartDate);
        break;
      default:
    }

    setStartTimeRange(format(newStartDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    setEndTimeRange(format(newEndDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"));
  };

  const previous = (chartName, startDate, endDate) => {
    let newStartDate, newEndDate;

    switch (chartName) {
      case "todays":
        newStartDate = subDays(parseISO(startTimeRange), 1);
        newEndDate = endOfDay(newStartDate);
        break;
      case "weeks":
        newStartDate = subWeeks(parseISO(startDate), 1);
        newEndDate = endOfWeek(newStartDate);
        break;
      case "months":
        newStartDate = subMonths(parseISO(startDate), 1);
        newEndDate = endOfMonth(newStartDate);
        break;
      default:
    }

    setStartTimeRange(format(newStartDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    setEndTimeRange(format(newEndDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"));
  };
  return (
    <div className="md:flex h-screen">
      <div className="md:block md:w-1/2">
        <div className="flex justify-center m-2">
          <button
            onClick={handleClickToday}
            className="border rounded-t py-1 px-2 text-cyan-700 font-semibold text-center">
            Today
          </button>
          <button
            onClick={handleClickWeekly}
            className="border rounded-t py-1 px-2 text-cyan-700 font-semibold text-center active:text-red">
            Weekly
          </button>
          <button
            onClick={handleClickMonthly}
            className="border rounded-t py-1 px-2 text-cyan-700 font-semibold text-center">
            Monthly
          </button>
        </div>
        <div className="flex text-center justify-around m-2">
          <button
            type="button"
            onClick={() => previous(chartTitle, startTimeRange, endTimeRange)}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Previous month</span>
            <HiChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <h1>
            {chartTitle === "todays"
              ? `${format(parseISO(startTimeRange), "dd MMM yyyy")}`
              : `${format(parseISO(startTimeRange), "dd MMM yyyy")} - ${format(
                  subDays(parseISO(endTimeRange), 1),
                  "dd MMM yyyy"
                )}`}
          </h1>
          <button
            onClick={() => next(chartTitle, startTimeRange, endTimeRange)}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 ">
            <span className="sr-only">Next month</span>
            <HiChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="p-4 w-70 md:flex md:flex-col md:items-center">
          <PieChartComponent chartTitle={chartTitle} />
          <BarChartComponent />
        </div>
      </div>
      <div className="hidden border-l md:block md:w-1/2">
        <TaskList />
      </div>
    </div>
  );
};

export default Summary;
