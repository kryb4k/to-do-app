const Input = ({
  label,
  labelText,
  register,
  error,
  requiredSymbol,
  defValue,
}) => {
  const getValidationRules = (label) => {
    if (label === "taskTitle") {
      return {
        required: "This field is required",
        maxLength: {
          value: 150,
          message: "Exceeded max length 150 characters",
        },
        minLength: {
          value: 5,
          message: "Field must be at least 5 characters",
        },
      };
    } else if (label === "email") {
      return {
        required: "This field is required",
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Invalid email address",
        },
      };
    }
  };

  return (
    <div
      className={`w-full block border-b ${
        error[label] ? "border-red-700" : "border-cyan-700"
      } py-2`}>
      <label
        htmlFor={label}
        className={`block uppercase tracking-wide ${
          error[label] ? "text-red-700" : "text-gray-700"
        } text-xs font-bold mb-2 md:text-base`}>
        {labelText}
        {requiredSymbol && <span className="text-red-700">*</span>}
      </label>
      <input
        type={label === "email" ? "email" : "text"}
        {...register(label, getValidationRules(label))}
        id={label}
        className={`w-full ${error[label] ? "border-red-700" : ""}`}
        // value={defValue}
      />
      {error[label] && (
        <p className="text-sm text-red-700 mt-1">{error[label].message}</p>
      )}
    </div>
  );
};

export default Input;
