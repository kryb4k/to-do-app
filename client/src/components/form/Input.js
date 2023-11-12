const Input = ({ label, labelText, register, error }) => {
  return (
    <div
      className={`w-full block border-b ${
        error[label] ? "border-red-700" : "border-cyan-700"
      } py-2`}>
      <label
        htmlFor={label}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {labelText}
      </label>
      <input
        type="text"
        {...register(label, {
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
        id={label}
        className={`w-full ${error[label] ? "border-red-700" : ""}`}
      />
      {error[label] && (
        <p className="text-sm text-red-700 mt-1">{error[label].message}</p>
      )}
    </div>
  );
};

export default Input;
