import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import DateInput from "./DateInput";
import DescriptionInput from "./DescriptionInput";
import FormTitle from "./FormTitle";
import { useTodoContext } from "../../hooks/TodoContext.js";
import { createTask } from "../../api/createTask";
import { toast } from "react-toastify";
import NotificationCehckbox from "./NotificationCheckbox.js";
import Email from "./Email";

const Form = (newDate) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { dispatch } = useTodoContext();

  const onSubmit = async (data, event) => {
    event.target.reset();
    try {
      console.log("task created");
      await createTask(data, dispatch);
      toast.success("Task created successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error creating task:", error.message);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="p-2">
      <div className="m-3 w-100 md:p-3 md:mx-auto">
        <FormTitle title="create task" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-wrap gap-2">
          <Input
            label="taskTitle"
            labelText="title"
            register={register}
            error={errors}
            requiredSymbol={true}
          />
          <DescriptionInput
            label="taskDescription"
            labelText="description"
            register={register}
            error={errors}
          />
          <div className="w-full block items-center">
            <Select label="priority" register={register} />
            <DateInput
              label="startDateTime"
              labelText="start time"
              register={register}
              error={errors}
              defaultValue={newDate}
              requiredSymbol={true}
            />
            <DateInput
              label="endDateTime"
              labelText="end time"
              register={register}
              error={errors}
              defaultValue={newDate}
              requiredSymbol={true}
            />
            <NotificationCehckbox
              label="notificationsEnabled"
              register={register}
            />
            <Email
              label="email"
              register={register}
              error={errors}
              requiredSymbol={true}
            />
          </div>
          <button className="w-full bg-transparent py-2 px4 mt-2 border border-cyan-700 rounded text-cyan-900 font-bold text-m uppercase hover:bg-cyan-700 hover:text-white active:bg-cyan-700 active:text-white focus:bg-cyan-700 focus:text-white md:text-lg">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
