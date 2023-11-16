const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-gray-800 opacity-50"
            onClick={onClose}></div>
          <div className="bg-white w-3/4 md:w-2/5 rounded-lg z-50">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
