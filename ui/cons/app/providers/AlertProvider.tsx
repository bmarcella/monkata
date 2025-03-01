import React, { createContext, useContext, useState, type ReactNode } from "react";
import DismissAlert from "~/components/shared/DismissAlert";

interface Alert {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface AlertContextType {
  alert: Alert | null;
  showAlert: (message: string, type: Alert["type"]) => void;
  clearAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = (message: string, type: Alert["type"]) => {
    setAlert({ message, type });

    // Auto-clear alert after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const clearAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
      {alert && (
        <DismissAlert type={alert.type} message={alert.message} ></DismissAlert> 
        // <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg text-white bg-${alert.type}`}>
        //   {alert.message}
        // </div>
      )}
    </AlertContext.Provider>
  );
};

// Custom hook to use the alert
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
