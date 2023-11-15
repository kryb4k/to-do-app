import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateForm = ({ task, onUpdate, onCancel }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: task,
  });

  const onSubmit = (data) => {
    const updatedTask = { ...task, ...data };
    onUpdate(updatedTask);
    toast.success("Task updated successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="taskTitle"
            className="block text-sm font-medium text-gray-700">
            Task Title
          </label>
          <Controller
            name="taskTitle"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="taskTitle"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Task Title"
              />
            )}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="taskDescription"
            className="block text-sm font-medium text-gray-700">
            Task Description
          </label>
          <Controller
            name="taskDescription"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="taskDescription"
                rows="3"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Task Description"
              />
            )}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="priority"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Priority (1, 2, or 3)"
              />
            )}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="taskDate"
            className="block text-sm font-medium text-gray-700">
            Task Date
          </label>
          <Controller
            name="taskDate"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="taskDate"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Task Date"
              />
            )}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="ml-2 border p-2 rounded-md">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
