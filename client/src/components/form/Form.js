import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import DateInput from "./DateInput";
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
    event.target.reset();
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
            requiredSymbol={true}
          />
        </div>
        <AddButton type="submit" name="add" />
      </form>
    </div>
  );
};

export default Form;
