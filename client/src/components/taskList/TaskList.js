import { useState, useEffect } from "react";
import { getAllTasks } from "../../api/getAllTasks";
import Task from "./Task";
import { format, parseISO } from "date-fns";

const TaskList = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllTasks();
      setTaskData(data);
    }
    fetchData();
  }, []);

  function dateParser(date) {
    return format(parseISO(date), "yyy-MM-dd");
  }

  const taskList = taskData.map((task) => (
    <Task
      key={task.id}
      taskTitle={task.taskTitle}
      taskDescription={task.taskDescription}
      priority={task.priority}
      taskDate={dateParser(task.startDateTime)}
      isDone={task.isDone}
    />
  ));

  return <div>{taskList}</div>;
};

export default TaskList;
