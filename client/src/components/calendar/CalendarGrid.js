import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
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
import Task from "./Task";

const CalendarGrid = () => {
  const tasks = [
    {
      id: 1,
      name: "Shopping",
      startDatetime: "2023-11-11T13:00",
      endDatetime: "2023-11-11T14:30",
    },
    {
      id: 2,
      name: "House Cleaning",
      startDatetime: "2023-11-06T13:00",
      endDatetime: "2023-11-06T14:30",
    },
  ];

  let today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [showCurrentMonthButton, setShowCurrentMonthButton] = useState(false);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  // Filling calendar with days
  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  //Switching months

  const previousMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setShowCurrentMonthButton(true);
  };

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setShowCurrentMonthButton(true);
  };

  //Passing classes with functions from date-fns
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  //Filtering days when tasks are planned
  let selectedDayTasks = tasks.filter((task) =>
    isSameDay(parseISO(task.startDatetime), selectedDay)
  );

  return (
    <div>
      <div>
        <div className="flex items-center">
          <h1 className="flex-auto font-semibold text-grey-500">
            {format(firstDayCurrentMonth, "MMMM yyyy")}
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
              {tasks.some((meeting) =>
                isSameDay(parseISO(meeting.startDatetime), day)
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
              // Add tasks information by props
              <Task key={task.id} taskDetails={task} />
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