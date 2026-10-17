const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16">
      <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 text-sm font-medium">{text}</p>
    </div>
  );
};

export default Loader;
