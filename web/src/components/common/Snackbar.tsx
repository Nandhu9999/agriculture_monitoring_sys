import React, { useState, useEffect } from "react";

interface SnackbarProps {
  message: string;
  duration?: number; // duration in milliseconds
}

const Snackbar: React.FC<SnackbarProps> = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [message, duration]);

  return (
    <div
      className={`w-auto fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
