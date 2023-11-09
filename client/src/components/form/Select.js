import React from "react";

const Select = React.forwardRef(({ onChange, label, register }, ref) => (
  <div className="w-full block border-b border-cyan-700 py-2">
    <label
      htmlFor={label}
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      {label}
    </label>
    <select
      id={label}
      className="w-full"
      ref={ref}
      onChange={onChange}
      {...register("priority")}>
      <option value={1}>LOW</option>
      <option value={2}>MEDIUM</option>
      <option value={3}>HIGH</option>
    </select>
  </div>
));

export default Select;
