const TaskDescriptionContent = ({ descriptionContent }) => {
  return (
    <div>
      <h2 className="uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2">
        Description
      </h2>
      <div className="h-24 overflow-y-auto mt-2 mb-2 p-1">
        <p className="uppercase tracking-wide text-gray-700 font-medium text-xs mb-2">
          {descriptionContent}
        </p>
      </div>
    </div>
  );
};

export default TaskDescriptionContent;
