const NotificationCheckbox = ({ label, register }) => {
  return (
    <div className="flex justify-start mt-4 gap-2">
      <input
        type="checkbox"
        id="allow-notification"
        className="w-4 h-4"
        {...register(label, { required: false })}
      />
      <label
        htmlFor="allow-notification"
        className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:text-base">
        Allow notification
      </label>
    </div>
  );
};

export default NotificationCheckbox;
