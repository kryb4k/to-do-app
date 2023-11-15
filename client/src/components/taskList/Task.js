import { useState } from "react";
import {
  HiChevronDown,
  HiChevronLeft,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiCheckCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { updateTaskContent } from "../../api/updateTaskContent.js";

const Task = ({ task, onDelete, onUpdate }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isTaskDone, setIsTaskDone] = useState(false);
  const [newTask, setNewTask] = useState(task);

  const handleTaskFinish = () => {
    //   console.log(isTaskDone);
    //   setIsTaskDone(!isTaskDone);
    //   //Later change isTaskDone to this task.isDone value

    const updatedTask = { ...newTask, isDone: !newTask.isDone };
    setNewTask(updatedTask);
    onUpdate(newTask);
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  const handleTaskUpdate = () => {
    const updatedTask = { ...task, isDone: !task.isDone };

    onUpdate(updatedTask);
  };

  const toggleUpdateForm = () => {
    setIsUpdating(!isUpdating);
    console.log("Task update state:", isUpdating);
  };

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  const priorityLevel = (taskLevel) => {
    switch (taskLevel) {
      case 1:
        return (
          <span className="font-semibold text-xs ml-2 text-emerald-600 uppercase">
            low
          </span>
        );
      case 2:
        return (
          <span className="font-semibold text-xs ml-2 text-orange-600 uppercase">
            medium
          </span>
        );
      case 3:
        return (
          <span className="font-semibold text-xs ml-2 text-rose-700 uppercase">
            high
          </span>
        );
    }
  };

  return (
    <div className="mt-1">
      <div className="flex border-b border-cyan-700 m-3 items-center justify-items-center block">
        <button className="w-1/6 text-center" onClick={handleTaskFinish}>
          {newTask.isDone ? (
            <HiCheckCircle className="w-6 h-6 text-emerald-600" />
          ) : (
            <HiOutlineCheckCircle className="w-6 h-6 text-grey-600" />
          )}
        </button>
        <div className="w-full ml-1">
          <h1
            className={`uppercase tracking-wide ${
              newTask.isDone ? `text-grey-200 line-through` : `text-grey-800`
            } text-sm text-left font-bold p-2`}>
            {newTask.taskTitle}
          </h1>
        </div>
        {/* //ogarnac ikony */}
        <div className="w-1/8">
          <button onClick={toggleDetails}>
            {isDetailsVisible ? (
              <HiChevronDown className="w-5 h-5" />
            ) : (
              <HiChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      {isDetailsVisible && (
        <div>
          <div className="m-4">
            {newTask.taskDescription && (
              <div>
                <h2 className="uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2">
                  Description
                </h2>
                <div className="h-20 overflow-y-auto mt-2 mb-2 p-1">
                  <p className="uppercase tracking-wide text-gray-700 font-medium text-xs mb-2">
                    {newTask.taskDescription}
                  </p>
                </div>
              </div>
            )}
            <div className="flex mb-4 text-center">
              <h3 className="w-1/2 uppercase tracking-wide text-left text-gray-700 text-sm font-semibold mb-2">
                Priority
                {priorityLevel(newTask.priority)}
              </h3>
              {newTask.taskDate && (
                <h3 className="w-1/2 uppercase tracking-wide text-right text-gray-700 font-semibold text-sm mb-2">
                  date
                  <span className="font-semibold text-xs ml-2 uppercase">
                    {newTask.taskDate}
                  </span>
                </h3>
              )}
            </div>
          </div>
          <div className="block text-right">
            <button onClick={handleDeleteClick} className="mr-5">
              <HiOutlineTrash className="w-6 h-6" />
            </button>
            <button onClick={toggleUpdateForm}>
              <HiOutlinePencilSquare className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
