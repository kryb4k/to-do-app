import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import DateInputs from "./DateInputs";
import DescriptionInput from "./DescriptionInput";
import FormTitle from "./FormTitle";
import { useTodoContext } from "../../hooks/TodoContext";
import { createTask } from "../../api/createTask";
import { toast } from "react-toastify";
import NotificationCehckbox from "./NotificationCheckbox";
import Email from "./Email";

const Form = (newDate) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { dispatch } = useTodoContext();

  const onSubmit = async (data, event) => {
    event.target.reset();
    try {
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
      <div className="m-3 w-100 md:p-5 md:mx-auto">
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
            <DateInputs
              label="startDateTime"
              label2="endDateTime"
              register={register}
              error={errors}
              defaultValue={newDate}
              requiredSymbol={true}
              setValue={setValue}
              watch={watch}
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
