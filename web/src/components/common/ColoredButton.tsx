export default function ColoredButton({
  children,
  blue,
  red,
  pink,
  yellow,
  onClick,
}: any) {
  console.log(blue, red, pink, yellow);
  if (blue) {
    return (
      <button
        onClick={onClick}
        className="text-white w-full flex justify-center items-center bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-blue-500"
      >
        {children}
      </button>
    );
  } else if (red) {
    return (
      <button
        onClick={onClick}
        className="text-white w-full flex justify-center items-center bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-red-500"
      >
        {children}
      </button>
    );
  } else if (pink) {
    return (
      <button
        onClick={onClick}
        className="text-white w-full flex justify-center items-center bg-pink-500 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-pink-500"
      >
        {children}
      </button>
    );
  } else if (yellow) {
    return (
      <button
        onClick={onClick}
        className="text-white w-full flex justify-center items-center bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-500"
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className="text-white w-full flex justify-center items-center bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-primary"
      >
        {children}
      </button>
    );
  }
}
