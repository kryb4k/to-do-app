import { useState, useEffect } from "react";
import {
  endOfMonth,
  startOfMonth,
  startOfToday,
  startOfWeek,
  endOfWeek,
  subDays,
  format,
  startOfDay,
  endOfDay,
} from "date-fns";
import { getAllTasksByMonth } from "../../api/getAllTasksByMonth.js";
import { toast } from "react-toastify";
import { useTodoContext } from "../../hooks/TodoContext.js";
import PieChartComponent from "./charts/PieChartComponent.js";
import BarChartComponent from "./charts/BarChartComponent.js";

const Summary = () => {
  const { dispatch } = useTodoContext();
  const today = startOfToday();
  const [startTimeRange, setStartTimeRange] = useState(
    format(startOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'")
  );
  const [endTimeRange, setEndTimeRange] = useState(
    format(endOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'")
  );
  const [chartTitle, setChartTitle] = useState("Todays");

  const handleClickToday = () => {
    setStartTimeRange(format(startOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    setEndTimeRange(format(endOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    setChartTitle("todays");
  };
  const handleClickWeekly = () => {
    setStartTimeRange(
      format(startOfWeek(subDays(today, 1)), "yyyy-MM-dd'T'HH:mm:ss'Z'")
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

  return (
    <div>
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

      <PieChartComponent chartTitle={chartTitle} />
      <BarChartComponent />
    </div>
  );
};

export default Summary;
