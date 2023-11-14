import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import {
  format,
  getDay,
  isSameMonth,
  isToday,
  isEqual,
  isSameDay,
  parse,
  parseISO,
  startOfToday,
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  startOfMonth,
} from "date-fns";
import { getAllTasksByMonth } from "../../api/getAllTasksByMonth";
import Task from "../taskList/Task";
import { toast } from "react-toastify";
import { deleteTask } from "../../api/deleteTask";

const CalendarGrid = () => {
  let today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [showCurrentMonthButton, setShowCurrentMonthButton] = useState(false);
  const [tasks, setTasks] = useState([]);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
  let firstDayPrevMonth = add(firstDayCurrentMonth, { months: 1 });

  let startDateParam = format(firstDayNextMonth, "yyyy-MM-dd'T'HH:mm:ss'Z'");
  let endDateParam = format(firstDayPrevMonth, "yyyy-MM-dd'T'HH:mm:ss'Z'");

  // Filling calendar with days
  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  // Fetch data for selected month
  // check if lenght of tasks is the same as it was
  //somehow send delete
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllTasksByMonth(startDateParam, endDateParam);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Unable to fetch tasks. Please try again.");
      }
    }

    fetchData();
  }, [startDateParam, endDateParam]);

  const nextMonth = () => {
    setCurrentMonth(format(firstDayPrevMonth, "MMM-yyyy"));
    setShowCurrentMonthButton(true);
  };

  const previousMonth = () => {
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setShowCurrentMonthButton(true);
  };

  //Passing classes with functions from date-fns
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  //Filtering days when tasks are planned
  let selectedDayTasks = tasks.filter(
    (task) => isSameDay(parseISO(task.startDateTime), selectedDay) //format task date as selectedDay
  );

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      toast.success("Task deleted successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  //     const handleEdit = async () => {
  //       try {
  //         await updateTaskContent(taskId);
  //         toast.success("Task deleted successfully", {
  //           position: "top-center",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //         });
  //       } catch (error) {
  //         toast.error(error, {
  //           position: "top-center",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //         });
  //       }
  //     };

  return (
    <div>
      <div>
        <div className="flex items-center">
          <h1 className="flex-auto font-semibold text-grey-500">
            {format(firstDayCurrentMonth, "MMM yyyy")}
          </h1>
          {showCurrentMonthButton && (
            <button
              className="text-white bg-cyan-700 p-1 rounded text-xs"
              onClick={() => {
                setCurrentMonth(format(today, "MMM-yyyy"));
                setShowCurrentMonthButton(false);
              }}>
              Current Month
            </button>
          )}
          <button
            type="button"
            onClick={previousMonth}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Previous month</span>
            <HiChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Next month</span>
            <HiChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
        <div className="text-red-500">Sun</div>
        <div>Mon</div>
        <div>Tues</div>
        <div>Wed</div>
        <div>Thurs</div>
        <div>Fri</div>
        <div className="text-red-500">Sat</div>
      </div>
      <div className="grid grid-cols-7 mt-2 text-sm">
        {days.map((day, index) => (
          <div
            key={day.toString()}
            className={classNames(
              index === 0 && `col-start-${getDay(day)}`,
              "py-1.5"
            )}>
            <button
              type="button"
              onClick={() => setSelectedDay(day)}
              className={classNames(
                isEqual(day, selectedDay) && "text-white",
                !isEqual(day, selectedDay) && isToday(day) && "text-cyan-700",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  isSameMonth(day, firstDayCurrentMonth) &&
                  "text-gray-900",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  "text-gray-400",
                isEqual(day, selectedDay) && isToday(day) && "bg-cyan-700",
                isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                !isEqual(day, selectedDay) && "hover:bg-gray-200",
                (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
              )}>
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
            <div className="w-1 h-1 mx-auto mt-1">
              {tasks.some((task) =>
                isSameDay(parseISO(task.startDateTime), day)
              ) && <div className="w-1 h-1 rounded-full bg-sky-500"></div>}
            </div>
          </div>
        ))}
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <section>
        <h2 className="font-semibold text-gray-900">
          {" "}
          Schedule for{" "}
          <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
            {format(selectedDay, "MMM dd, yyy")}
          </time>
        </h2>
        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
          {selectedDayTasks.length > 0 ? (
            selectedDayTasks.map((task) => (
              <Task
                key={task.id}
                taskId={task.id}
                taskTitle={task.taskTitle}
                isDone={task.isDone}
                priority={task.priority}
                taskDescription={task.taskDescription}
                onDelete={handleTaskDelete}
              />
            ))
          ) : (
            <p>No tasks for today.</p>
          )}
        </ol>
      </section>
    </div>
  );
};

export default CalendarGrid;
