export default function Simulation() {
  return (
    <div className="mx-auto">
      <div className="flex flex-col sm:flex-row mb-2 justify-center">
        <div className="w-full sm:w-6/12 lg:w-4/12 aspect-square rounded-lg bg-gray-200 animate-pulse" />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full sm:w-6/12 lg:w-4/12 flex">
          <button className="text-white w-full bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-primary">
            Capture
          </button>
        </div>
      </div>
    </div>
  );
}
