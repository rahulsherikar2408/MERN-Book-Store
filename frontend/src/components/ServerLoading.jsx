
const ServerLoading = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>

      {/* Message */}
      <h2 className="mt-6 text-xl sm:text-2xl font-semibold text-gray-800">
        Starting server...
      </h2>

      <p className="mt-2 px-6 text-center text-sm sm:text-base text-gray-500 max-w-md">
        The backend server is waking up. Please wait a moment.
      </p>

    </div>
  );
};

export default ServerLoading;