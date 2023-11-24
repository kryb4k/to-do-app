const DescriptionInput = ({ label, labelText, register, error }) => {
  return (
    <div
      className={`w-full block border-b ${
        error[label] ? "border-red-700" : "border-cyan-700"
      } py-2`}>
      <label
        htmlFor={label}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:text-base">
        {labelText}
      </label>
      <textarea
        id={label}
        className={`w-full resize-none h-36 ${
          error[label] ? "border-red-700" : ""
        }`}
        {...register(label, {
          required: false,
          maxLength: {
            value: 250,
            message: "Exceeded max length 250 characters",
          },
        })}></textarea>
      {error[label] && (
        <p className="text-sm text-red-700 mt-1">{error[label].message}</p>
      )}
    </div>
  );
};

export default DescriptionInput;
