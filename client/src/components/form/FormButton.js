const FormButton = ({ type, name }) => {
  return (
    <button
      type={type}
      className="w-full bg-transparent py-2 px4 mt-2 border border-cyan-700 rounded text-cyan-900 font-bold text-m uppercase hover:bg-cyan-700 hover:text-white md:text-lg">
      {name}
    </button>
  );
};

export default FormButton;
