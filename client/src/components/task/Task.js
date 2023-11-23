import { useState } from "react";
import { toast } from "react-toastify";
import {
  HiChevronDown,
  HiChevronLeft,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiCheckCircle,
  HiOutlineCheckCircle,
  HiOutlineBell,
  HiBellAlert,
} from "react-icons/hi2";
import UpdateForm from "./UpdateForm";
import Modal from "../utilities/Modal";
import { format, parseISO } from "date-fns";

const Task = ({ task, onDelete, onUpdate }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState(task);

  const handleTaskNotification = () => {
    const updatedTask = {
      ...newTask,
      notificationsEnabled: !newTask.notificationsEnabled,
    };
    setNewTask(updatedTask);
    onUpdate(updatedTask);
    if (newTask.notificationsEnabled) {
      toast.warn("Task notification disabled.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success("Task notification enabled.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleTaskFinish = () => {
    const updatedTask = { ...newTask, isDone: !newTask.isDone };
    setNewTask(updatedTask);
    onUpdate(updatedTask);
    if (newTask.isDone) {
      toast.info("Task set as not finished", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success("Task finshed! Congrats!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  const handleTaskUpdate = (updatedTask) => {
    setNewTask(updatedTask);
    onUpdate(updatedTask);
    closeModal();
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
      default:
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-1">
      <div className="flex border-b border-cyan-700 m-3 items-center justify-items-center block">
        <button className="w-1/6 text-center" onClick={handleTaskFinish}>
          {newTask.isDone ? (
            <HiCheckCircle className="w-6 h-6 text-emerald-600 hover:text-emerald-400 rounded-full" />
          ) : (
            <HiOutlineCheckCircle className="w-6 h-6 text-slate-800 hover:bg-slate-200 rounded-full" />
          )}
        </button>
        <div className="w-full ml-1">
          <h1
            className={`uppercase tracking-wide ${
              newTask.isDone ? `text-slate-400 line-through` : `text-slate-800`
            } text-sm text-left font-bold p-2`}>
            {task.taskTitle}
          </h1>
        </div>
        <div className="w-1/8">
          <button onClick={toggleDetails}>
            {isDetailsVisible ? (
              <HiChevronDown className="w-7 h-7 p-1 rounded-full hover:bg-slate-200" />
            ) : (
              <HiChevronLeft className="w-7 h-7 p-1 rounded-full hover:bg-slate-200" />
            )}
          </button>
        </div>
      </div>
      {isDetailsVisible && (
        <div>
          <div className="m-4">
            {task.taskDescription && (
              <div>
                <h2 className="uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2">
                  Description
                </h2>
                <div className="h-20 overflow-y-auto mt-2 mb-2 p-1">
                  <p className="uppercase tracking-wide text-gray-700 font-medium text-xs mb-2">
                    {task.taskDescription}
                  </p>
                </div>
              </div>
            )}
            <div className="flex mb-4 text-center">
              <h3 className="w-1/2 uppercase tracking-wide text-left text-gray-700 text-sm font-semibold mb-2">
                Priority
                {priorityLevel(task.priority)}
              </h3>

              <h3 className="w-1/2 uppercase tracking-wide text-right text-slate-700 font-semibold text-sm mb-2">
                {`${format(parseISO(task.startDateTime), "dd.MM.yyy")}`}
                <span className="font-semibold text-xs ml-2 uppercase text-red-800">
                  {`${format(parseISO(task.startDateTime), "k:mm")} -
                    ${format(parseISO(task.endDateTime), "k:mm")}`}
                </span>
              </h3>
            </div>
          </div>
          <div className="block text-right">
            <button onClick={handleTaskNotification} className="mr-5">
              {!newTask.notificationsEnabled ? (
                <HiOutlineBell className="w-8 h-8 p-1 hover:bg-slate-200 rounded-full" />
              ) : (
                <HiBellAlert className="w-8 h-8 p-1 text-amber-600  hover:text-amber-500 hover:bg-slate-200 rounded-full" />
              )}
            </button>
            <button onClick={handleDeleteClick} className="mr-5">
              <HiOutlineTrash className="w-8 h-8 p-1 hover:bg-slate-200 rounded-full" />
            </button>
            <button onClick={openModal}>
              <HiOutlinePencilSquare className="w-8 h-8 p-1 hover:bg-slate-200 rounded-full" />
            </button>
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UpdateForm
          task={newTask}
          onUpdate={handleTaskUpdate}
          onCancel={() => {
            closeModal();
          }}
          className="md:w-100"
        />
      </Modal>
    </div>
  );
};

export default Task;
