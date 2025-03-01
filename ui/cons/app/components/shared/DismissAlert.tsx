import React, { useState, useEffect } from "react";
import { XCircleIcon } from "lucide-react"; // Using Lucide icons (better than SVGs)

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
  autoDismiss?: boolean;
  dismissTime?: number;
}

const alertStyles: Record<AlertType, string> = {
  success: "bg-green-500 border-green-800 text-white-700",
  error: "bg-red-500 border-red-800 text-white-700",
  warning: "bg-yellow-500 border-yellow-800 text-white-700",
  info: "bg-blue-500 border-blue-800 text-white-700",
};

const DismissAlert: React.FC<AlertProps> = ({ type, message, autoDismiss = false, dismissTime = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => setVisible(false), dismissTime);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissTime]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-20 right-4 p-4 rounded-lg shadow-lg text-white z-[999] ${alertStyles[type]} transition-all`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button onClick={() => setVisible(false)} className="ml-4 text-black-500 hover:text-gray-700">
        <XCircleIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default DismissAlert;
