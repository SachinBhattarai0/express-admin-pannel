import { useEffect, useState } from "react";
import { TableInfo } from "../types/main";
import Button from "./Form/Button";
import { FromBuilder } from "../utils/FromBuilder";
import { postRequest } from "../utils/fetches";

type FormSelectionProps = {
  activeTable: TableInfo | null;
  fetchUrl: string;
};
//some chane

const FormSection = ({ activeTable, fetchUrl }: FormSelectionProps) => {
  const formBuilder = new FromBuilder(fetchUrl);
  const [activeTableState, setActiveTableState] = useState<TableInfo | null>(
    activeTable
  );

  useEffect(() => {
    if (!activeTable?.tableName) return;

    activeTable.fields.forEach(async (field, i) => {
      if (!field.relationWith) return;
      const modelName = field.relationWith.model.slice(0, -1);
      const option = await postRequest(`${fetchUrl}/model-values/${modelName}`);

      field.relationWith.options = option;
      activeTable.fields[i] = field;
    });

    setActiveTableState(activeTable);
  }, [activeTable]);

  return (
    <form className="bg-white m-4 p-3 md:p-6 rounded border border-gray-300 shadow-md space-y-1">
      {formBuilder.generateField(activeTableState?.fields)}

      <Button>Submit</Button>
    </form>
  );
};

export default FormSection;
