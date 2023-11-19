import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateForm = ({ task, onUpdate, onCancel }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: task,
  });
  const today = new Date();
  const onSubmit = (data) => {
    data.startDateTime = new Date(data.startDateTime);
    data.startDateTime = format(
      data.startDateTime.getTime() + data.startDateTime.getTimezoneOffset(),
      "yyyy-MM-dd'T'HH:mm:ss'Z'"
    );
    data.priority = parseInt(data.priority);
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
    <div className="p-5 w-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 w-full block border-b border-cyan-700">
          <label
            htmlFor="taskTitle"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Title
          </label>
          <Controller
            name="taskTitle"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="taskTitle"
                className="w-full bordre-none"
              />
            )}
          />
        </div>

        <div className="mb-4 w-full block border-b border-cyan-700">
          <label
            htmlFor="taskDescription"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Description
          </label>
          <Controller
            name="taskDescription"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="taskDescription"
                rows="3"
                className="w-full border-none resize-none h-36"
                maxLength={250}
              />
            )}
          />
        </div>

        <div className="mb-4 w-full block border-b border-cyan-700">
          <label
            htmlFor="priority"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Priority
          </label>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <select {...field} id="priority" className="w-full bordre-none">
                <option value={1}>LOW</option>
                <option value={2}>MEDIUM</option>
                <option value={3}>HIGH</option>
              </select>
            )}
          />
        </div>
        <div className="mb-4 w-full block border-b border-cyan-700">
          <label
            htmlFor="newTaskDate"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            New Task Date
          </label>
          <Controller
            name="startDateTime"
            control={control}
            min={today}
            render={({ field }) => (
              <input
                {...field}
                type="datetime-local"
                id="startDateTime"
                className="w-full border-none"
              />
            )}
          />
        </div>

        <div className="flex gap-3 justify-center">
          <button
            type="submit"
            className="w-1/2 bg-cyan-700 py-2 px4 mt-2 border border-cyan-700 rounded text-white font-bold text-sm uppercase hover:bg-cyan-700 hover:text-white">
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-1/3 bg-transparent py-2 px4 mt-2 border border-cyan-700 rounded text-cyan-700 font-bold text-sm uppercase hover:bg-white hover:text-cyan-700">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
