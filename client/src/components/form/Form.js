import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import DateInput from "./DateInput";
import FormButton from "./FormButton";
import DescriptionInput from "./DescriptionInput";
import FormTitle from "./FormTitle";
import { useTodoContext } from "../../hooks/TodoContext.js";
import { createTask } from "../../api/createTask";
import { toast } from "react-toastify";

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
      <div className="m-3 md:w-3/6  md:mx-auto">
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
              labelText="date"
              register={register}
              error={errors}
              defaultValue={newDate}
              requiredSymbol={true}
            />
          </div>
          <FormButton type="submit" name="add" />
        </form>
      </div>
    </div>
  );
};

export default Form;
