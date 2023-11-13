import TaskDetails from "./TaskDetails";
import TaskListItem from "./TaskListItem";

const Task = ({ taskTitle, isDone, taskDate, priority, taskDescription }) => {
  return (
    <details className="mt-1">
      <summary className="list-none">
        <TaskListItem title={taskTitle} isDone={isDone} />
      </summary>
      <TaskDetails
        date={taskDate}
        priority={priority}
        description={taskDescription}
      />
    </details>
  );
};

export default Task;
