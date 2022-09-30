import React, { useState, useContext, createContext } from "react";
import { AlertType } from "../container/Alert";

export type Alert = {
  message: string;
  type: AlertType;
};

type UpdateAlert = (message: string, type?: AlertType) => void;

const AlertContext = createContext<{
  alertState: Alert | null;
  updateAlert: UpdateAlert | null;
}>({ alertState: null, updateAlert: null });

const AlertProvider = ({ children }: { children: React.ReactElement }) => {
  const [alertState, setAlertState] = useState<Alert | null>(null);

  const updateAlert: UpdateAlert = (message, type = "ERROR") => {
    setAlertState({ message: message, type });
    setTimeout(() => setAlertState(null), 4000);
  };

  return (
    <AlertContext.Provider value={{ alertState, updateAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
export const useAlertContext = () => useContext(AlertContext);
