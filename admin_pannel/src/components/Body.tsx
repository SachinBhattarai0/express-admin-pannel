import Header from "./Header";
import FormSection from "./FormSection";
import { useActiveTableContext } from "../context/ActiveTableContext";

const Body = ({ fetchUrl }: { fetchUrl: string }) => {
  const { activeTable } = useActiveTableContext();

  return (
    <div className="flex flex-col flex-1">
      <Header activeTable={activeTable} />
      <FormSection activeTable={activeTable} fetchUrl={fetchUrl} />
    </div>
  );
};

export default Body;
