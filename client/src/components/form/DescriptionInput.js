const DescriptionInput = ({ label, labelText, register }) => {
  return (
    <div className="w-full block border-b border-cyan-700 py-2">
      <label
        htmlFor={label}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {labelText}
      </label>
      <textarea
        id={label}
        className="resize-none w-full h-36"
        maxLength={200}
        {...register(label, { required: false, maxLength: 250 })}></textarea>
    </div>
  );
};

export default DescriptionInput;
