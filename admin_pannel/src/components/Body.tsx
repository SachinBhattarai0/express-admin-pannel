import Header from "./Header";
import FormSection from "./FormSection";
import { useActiveTableContext } from "../context/ActiveTableContext";

const Body = () => {
  const { activeTable } = useActiveTableContext();

  return (
    <div className="flex flex-col flex-1">
      <Header activeTable={activeTable} />
      <FormSection activeTable={activeTable} />
    </div>
  );
};

export default Body;
