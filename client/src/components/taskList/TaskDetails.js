import TaskDescriptionContent from "./TaskDescriptionContent";
const TaskDetails = ({ date, priority, description }) => {
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
    <div className="m-4">
      {description && (
        <TaskDescriptionContent descriptionContent={description} />
      )}
      <div className="flex mb-4 text-center">
        <h3 className="w-1/2 uppercase tracking-wide text-left text-gray-700 text-sm font-semibold mb-2">
          Priority
          {priorityLevel(priority)}
        </h3>
        {date && (
          <h3 className="w-1/2 uppercase tracking-wide text-right text-gray-700 font-semibold text-sm mb-2">
            date
            <span className="font-semibold text-xs ml-2 uppercase">{date}</span>
          </h3>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
