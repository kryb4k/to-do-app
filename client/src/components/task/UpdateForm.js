import { format, parseISO } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateForm = ({ task, onUpdate, onCancel }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      ...task,
      startDateTime: format(
        parseISO(task.startDateTime),
        "yyyy-MM-dd'T'HH:mm:ss"
      ),
    },
  });

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
            className={`block uppercase tracking-wide ${
              errors.taskTitle ? "text-red-700" : "text-gray-700"
            } text-xs font-bold mb-2 md:text-base`}>
            Title <span className="text-red-700">*</span>
          </label>
          <Controller
            name="taskTitle"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  id="taskTitle"
                  className={`w-full ${
                    errors.taskTitle ? "border-red-700" : ""
                  }`}
                  {...register("taskTitle", {
                    required: "This field is required",
                    maxLength: {
                      value: 150,
                      message: "Exceeded max length 150 characters",
                    },
                    minLength: {
                      value: 5,
                      message: "Field must be at least 5 characters",
                    },
                  })}
                />
                {errors.taskTitle && (
                  <p className="text-sm text-red-700 mt-1">
                    {errors.taskTitle.message}
                  </p>
                )}
              </div>
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
            className={`block uppercase tracking-wide ${
              errors.startDateTime ? "text-red-700" : "text-gray-700"
            } text-xs font-bold mb-2 md:text-base`}>
            Task Date <span className="text-red-700">*</span>
          </label>
          <Controller
            name="startDateTime"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="datetime-local"
                id="startDateTime"
                className="w-full border-none"
                {...register("startDateTime", {
                  required: "This field is required",
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "Invalid date format (YYYY-MM-DD)",
                  },
                })}
              />
            )}
          />
          {errors.startDateTime && (
            <p className="text-sm text-red-700 mt-1">
              {errors.startDateTime.message}
            </p>
          )}
        </div>
        <div className="mb-4 w-full block border-b border-cyan-700">
          <label
            htmlFor="email"
            className={`block uppercase tracking-wide ${
              errors.email ? "text-red-700" : "text-gray-700"
            } text-xs font-bold mb-2 md:text-base`}>
            Email <span className="text-red-700">*</span>
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                id="email"
                className="w-full bordre-none"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            )}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-700 mt-1">{errors.email.message}</p>
        )}

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
