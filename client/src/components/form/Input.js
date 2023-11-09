const Input = ({ label, labelText, register, errors }) => {
  return (
    <div className="w-full block border-b border-cyan-700 py-2">
      <label
        htmlFor={label}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {labelText}
      </label>
      <input
        {...register(label, { required: true, maxLength: 150 })}
        id={label}
        className="w-full"
      />
    </div>
  );
};

export default Input;
