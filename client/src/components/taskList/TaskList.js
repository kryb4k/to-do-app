import React, { useState, useEffect } from "react";
import { useTodoContext } from "../../hooks/TodoContext.js";
import Task from "../task/Task.js";
import { getAllTasks } from "../../api/getAllTasks.js";
import { toast } from "react-toastify";
import { deleteTask } from "../../api/deleteTask";
import { parseISO, compareAsc, compareDesc } from "date-fns";
import { updateTaskContent } from "../../api/updateTaskContent";

const TaskList = () => {
  const { state, dispatch } = useTodoContext();
  const [filterPriority, setFilterPriority] = useState("");
  const [filterIsDone, setFilterIsDone] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllTasks();
        dispatch({ type: "SET_TASKS", payload: data });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Unable to fetch tasks. Please try again.");
      }
    }

    fetchData();
  }, [dispatch]);

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTask(taskId, dispatch);
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

  const handleTaskUpdate = async (updatedTask) => {
    try {
      await updateTaskContent(updatedTask, dispatch);
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const clearFilters = () => {
    setFilterPriority(null);
    setFilterIsDone(null);
  };

  const sortedTasks = state.tasks.slice().sort((a, b) => {
    const dateA = parseISO(a.startDateTime);
    const dateB = parseISO(b.startDateTime);
    return isAscending ? compareAsc(dateA, dateB) : compareDesc(dateA, dateB);
  });

  const filteredTasks = sortedTasks
    .filter((task) =>
      filterPriority ? task.priority === filterPriority : true
    )
    .filter((task) =>
      filterIsDone !== null ? task.isDone === filterIsDone : true
    );

  return (
    <div>
      <div className="flex mx-2 mb-2 gap-4">
        <div className="mb-4 w-1/2 p-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:text-base">
            Filter by Priority:
          </label>
          <select
            onChange={(e) => setFilterPriority(parseInt(e.target.value))}
            value={filterPriority || ""}
            className="w-full hover:bg-slate-200 rounded p-1">
            <option value="">All</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
        <div className="mb-4 w-1/2 p-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:text-base">
            Filter by Status:
          </label>
          <select
            onChange={(e) => {
              setFilterIsDone(
                e.target.value === "true"
                  ? true
                  : e.target.value === "false"
                  ? false
                  : null
              );
            }}
            value={filterIsDone === null ? "" : filterIsDone.toString()}
            className="w-full hover:bg-slate-200 rounded p-1">
            <option value="">All</option>
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>
        </div>
      </div>
      <div className="mb-4 m-2 flex justify-between">
        <button
          onClick={toggleSortOrder}
          className="border rounded-t py-1 px-2 text-cyan-700 font-semibold text-center hover:bg-cyan-700 hover:text-white">
          {isAscending ? "Sort dates descending" : "Sort dates ascending"}
        </button>
        <button
          onClick={clearFilters}
          className="border rounded-t py-1 px-2 text-cyan-700 font-semibold text-center hover:bg-cyan-700 hover:text-white">
          Clear Filters
        </button>
      </div>
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={handleTaskDelete}
          onUpdate={handleTaskUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;
