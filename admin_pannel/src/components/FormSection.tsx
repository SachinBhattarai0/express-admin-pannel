import { TableInfo, FieldTypes } from "../types/main";
import Button from "./Form/Button";
import { FromBuilder } from "../utils/FromBuilder";

const FormSection = ({ activeTable }: { activeTable: TableInfo | null }) => {
  const formBuilder = new FromBuilder();

  return (
    <form className="bg-white m-4 p-3 md:p-6 rounded border border-gray-300 shadow-md space-y-1">
      {formBuilder.generateField(activeTable?.fields)}

      <Button>Submit</Button>
    </form>
  );
};

export default FormSection;
