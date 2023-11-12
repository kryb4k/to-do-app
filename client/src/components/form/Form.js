import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import DataInput from "./DataInput";
import AddButton from "./AddButton";
import DescriptionInput from "./DescriptionInput";
import FormTitle from "./FormTitle";
import { createTask } from "../../api/createTask";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      await createTask(data);
    } catch (error) {
      console.error("Error creating task:", error.message);
    }
  };

  return (
    <div className="m-3">
      <FormTitle title="create task" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-wrap gap-2">
        <Input
          label="taskTitle"
          labelText="title"
          register={register}
          error={errors}
        />
        <DescriptionInput
          label="taskDescription"
          labelText="description"
          register={register}
        />
        <Select label="priority" register={register} />
        <div className="w-full block items-center">
          <DataInput
            label="startDateTime"
            labelText="date"
            register={register}
            error={errors}
          />
        </div>
        <AddButton type="submit" name="add" />
      </form>
    </div>
  );
};

export default Form;
