import { useState, useEffect } from "react";
import { getAllTasks } from "../../api/getAllTasks";
import TaskDetails from "./TaskDetails";
import TaskListItem from "./TaskListItem";

const TaskList = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllTasks();
      setTaskData(data);
    }
    fetchData();
  }, []);

  const taskList = taskData.map((task) => (
    <details key={task.id} className="p-2">
      <summary className="list-none">
        <TaskListItem title={task.taskTitle} isDone={task.isDone} />
      </summary>
      <TaskDetails
        date={task.startDateTime}
        priority={task.priority}
        description={task.taskDescription}
      />
    </details>
  ));

  return <div>{taskList}</div>;
};

export default TaskList;
