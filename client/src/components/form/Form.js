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
    // console.log(data);
    await createTask(data);
  };

  return (
    <div className="m-3">
      <FormTitle title="create task" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-wrap gap-2">
        <Input label="taskTitle" labelText="title" register={register} />
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
          />
          {/* <DataInput label="endDateTime" labelText="from" register={register} /> */}
        </div>
        <AddButton type="submit" name="add" />
      </form>
    </div>
  );
};

export default Form;
