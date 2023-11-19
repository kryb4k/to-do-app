import React from "react";
import { format, subDays } from "date-fns";

const DateInput = ({
  label,
  labelText,
  register,
  error,
  requiredSymbol,
  defaultValue,
}) => {
  const today = new Date();
  const todayFormatted = format(today, "yyyy-MM-dd");
  const yesterday = subDays(today, 1);

  return (
    <div
      className={`w-full border-b ${
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
        id={label}
        type="datetime-local"
        className={`w-full ${
          error[label] ? "border-red-700 text-red-700" : ""
        }`}
        {...register(label, {
          valueAsDate: true,
          required: "This field is required",
          validate: (value) => {
            const selectedDate = new Date(value);
            return selectedDate < yesterday
              ? "You can't select past date"
              : undefined;
          },
        })}
        value={defaultValue.newDate}
        min={todayFormatted}
      />
      {error[label] && (
        <p className="text-sm text-red-700 mt-1">{error[label].message}</p>
      )}
    </div>
  );
};

export default DateInput;
