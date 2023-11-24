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
  subMinutes,
} from "date-fns";
import { getAllTasksByMonth } from "../../../api/getAllTasksByMonth.js";
import { toast } from "react-toastify";
import { useTodoContext } from "../../../hooks/TodoContext";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Charts = () => {
  const { dispatch } = useTodoContext();
  const today = startOfToday();
  const [startTimeRange, setStartTimeRange] = useState(
    format(startOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'")
  );
  const [endTimeRange, setEndTimeRange] = useState(
    format(subMinutes(endOfDay(today), 1), "yyyy-MM-dd'T'HH:mm:ss'Z'")
  );
  const [chartTitle, setChartTitle] = useState("daily");
  const handleClickToday = () => {
    setStartTimeRange(format(startOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    setEndTimeRange(format(endOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    setChartTitle("daily");
  };
  const handleClickWeekly = () => {
    setStartTimeRange(format(startOfWeek(today), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
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

  const next = (chartName, startDate) => {
    let newStartDate, newEndDate;

    switch (chartName) {
      case "daily":
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

  const previous = (chartName, startDate) => {
    let newStartDate, newEndDate;

    switch (chartName) {
      case "daily":
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
    <div className="md:block md:w-1/2">
      <div className="flex justify-center m-2">
        <button
          onClick={handleClickToday}
          className={`border rounded-t py-1 px-2  font-semibold text-center hover:bg-cyan-700 hover:text-white ${
            chartTitle === "daily"
              ? "bg-cyan-700 text-white"
              : "bg-white text-cyan-700"
          }`}>
          Daily
        </button>
        <button
          onClick={handleClickWeekly}
          className={`border rounded-t py-1 px-2  font-semibold text-center hover:bg-cyan-700 hover:text-white ${
            chartTitle === "weeks"
              ? "bg-cyan-700 text-white"
              : "bg-white text-cyan-700"
          }`}>
          Weekly
        </button>
        <button
          onClick={handleClickMonthly}
          className={`border rounded-t py-1 px-2  font-semibold text-center hover:bg-cyan-700 hover:text-white ${
            chartTitle === "months"
              ? "bg-cyan-700 text-white"
              : "bg-white text-cyan-700"
          }`}>
          Monthly
        </button>
      </div>
      <div className="flex text-center justify-around m-2">
        <button
          type="button"
          onClick={() => previous(chartTitle, startTimeRange, endTimeRange)}
          className="flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 hover:bg-slate-200 rounded-full">
          <HiChevronLeft className="w-5 h-5 " aria-hidden="true" />
        </button>
        <h1>
          {chartTitle === "daily"
            ? `${format(parseISO(startTimeRange), "dd MMM yyyy")}`
            : `${format(parseISO(startTimeRange), "dd MMM yyyy")} - ${format(
                subDays(parseISO(endTimeRange), 1),
                "dd MMM yyyy"
              )}`}
        </h1>
        <button
          onClick={() => next(chartTitle, startTimeRange, endTimeRange)}
          type="button"
          className="flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 hover:bg-slate-200 rounded-full">
          <HiChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div className="p-4 w-70 md:flex md:flex-col md:items-center">
        <PieChartComponent chartTitle={chartTitle} />
        <BarChartComponent />
      </div>
    </div>
  );
};

export default Charts;
