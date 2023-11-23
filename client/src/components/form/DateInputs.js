import {
  format,
  subDays,
  isSameDay,
  endOfDay,
  isBefore,
  isAfter,
} from "date-fns";

const DateInputs = ({
  label,
  label2,
  register,
  setValue,
  watch,
  error,
  requiredSymbol,
}) => {
  const today = new Date();
  const yesterday = format(subDays(today, 1), "yyyy-MM-dd'T'HH:mm");

  return (
    <div
      className={`w-full border-b gap-3${
        error[label] ? "border-red-700" : "border-cyan-700"
      } py-2`}>
      <label
        htmlFor={label}
        className={`block uppercase tracking-wide ${
          error[label] || error[label2] ? "text-red-700" : "text-gray-700"
        } text-xs font-bold mb-2 md:text-base`}>
        Task dates
        {requiredSymbol && <span className="text-red-700">*</span>}
      </label>
      <div className="w-full md:flex md:justify-between">
        <input
          id={label}
          type="datetime-local"
          className={`w-full md:w-5/12 ${
            error[label] ? "border-red-700 text-red-700" : ""
          }`}
          {...register(label, {
            valueAsDate: true,
            required: "This field is required",
          })}
          onChange={(e) => {
            setValue(label2, e.target.value);
            document.getElementById(label2).min = e.target.value;
          }}
          min={yesterday}
        />
        {error[label] && (
          <p className="text-sm text-red-700 mt-1">{error[label].message}</p>
        )}
        <input
          id={label2}
          type="datetime-local"
          className={`w-full md:w-5/12 mt-2 ${
            error[label2] ? "border-red-700 text-red-700" : ""
          }`}
          {...register(label2, {
            valueAsDate: true,
            required: "This field is required",
            validate: (value) => {
              const selectedDate = new Date(value);
              const startDate = watch(label);
              const isSameOrBefore =
                isSameDay(selectedDate, startDate) ||
                (isBefore(selectedDate, startDate) &&
                  isAfter(selectedDate, startDate));
              return !isSameOrBefore ? "You can't pick other date." : undefined;
            },
          })}
          min={watch(label)}
          max={endOfDay(watch(label))}
        />
        {error[label2] && (
          <p className="text-sm text-red-700 mt-1">{error[label2].message}</p>
        )}
      </div>
    </div>
  );
};

export default DateInputs;
