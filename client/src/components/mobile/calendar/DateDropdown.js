const DateDropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="m-2">
      <label>
        {label}:
        <select value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DateDropdown;
