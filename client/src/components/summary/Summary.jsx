import TaskList from "../taskList/TaskList";
import Charts from "./charts/Charts";

const Summary = () => {
  return (
    <div className="md:flex h-full">
      <Charts />
      <div className="border-l block md:w-1/2">
        <TaskList />
      </div>
    </div>
  );
};

export default Summary;
