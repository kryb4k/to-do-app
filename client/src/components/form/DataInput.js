const DataInput = ({ label, labelText, register, required }) => {
  return (
    <div className="w-full border-b border-cyan-700 py-2">
      <label
        htmlFor={label}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold m-2">
        {labelText}
      </label>
      <input
        id={label}
        type="date"
        className="w-full"
        {...register(label, { required: true })}
      />
    </div>
  );
};

export default DataInput;
