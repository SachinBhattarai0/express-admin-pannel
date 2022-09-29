import { useAlertContext } from "../context/AlertProvider";

export type AlertType = "ERROR" | "SUCCESS" | "WARNING";

const AlertTypes: { [key in AlertType]: string } = {
  ERROR: "text-red-700 bg-red-100",
  SUCCESS: "text-green-700 bg-green-100",
  WARNING: "text-yellow-700 bg-yellow-100",
};

const Alert = () => {
  const { alertState, updateAlert } = useAlertContext();
  if (!alertState || !updateAlert) return <div></div>;

  return (
    <div
      className={`p-4 animate-custom mt-4 text-sm rounded-lg absolute left-1/2 -translate-x-1/2 ${
        AlertTypes[alertState.type]
      }`}
    >
      {alertState.message}
    </div>
  );
};

export default Alert;
